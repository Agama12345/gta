# =====================================================================
#  ARCANE SPIRE — launcher gier (biblioteka + aktualizacje + serwer)
#  Wymaga wyłącznie Windows PowerShell 5.1 (jest w każdym Windows 10/11).
#  Ikona i wygląd: fioletowa runa. Gry pobierane z GitHuba.
# =====================================================================
param(
  [switch]$SelfTest
)

$ErrorActionPreference = 'Stop'

trap {
  # ostatnia linia obrony: każde nieoczekiwane zatrzymanie trafia do logu i do okienka
  try {
    $dir = Join-Path $env:LOCALAPPDATA 'ArcaneSpire'
    if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
    $stamp = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss')
    Add-Content -LiteralPath (Join-Path $dir 'launcher.log') -Value "[$stamp] FATAL: $_" -Encoding UTF8
    Add-Type -AssemblyName System.Windows.Forms
    [System.Windows.Forms.MessageBox]::Show(
      "Launcher napotkal blad:`n`n$_`n`nLog: $dir\launcher.log",
      'Arcane Spire',
      [System.Windows.Forms.MessageBoxButtons]::OK,
      [System.Windows.Forms.MessageBoxIcon]::Error
    ) | Out-Null
  } catch { }
  exit 1
}

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.IO.Compression.FileSystem
try {
  [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12
} catch { }

# ---------------------------------------------------------------- ścieżki
$Script:AppDir = Split-Path -Parent $PSCommandPath
$Script:DataDir = Join-Path $env:LOCALAPPDATA 'ArcaneSpire'
$Script:GamesDir = Join-Path $Script:DataDir 'games'
$Script:LibraryFile = Join-Path $Script:DataDir 'library.json'
$Script:LogFile = Join-Path $Script:DataDir 'launcher.log'
$Script:AppVersion = '1.0.0'

foreach ($dir in @($Script:DataDir, $Script:GamesDir)) {
  if (-not (Test-Path -LiteralPath $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
  }
}

function Write-Log {
  param([string]$Message)
  try {
    $stamp = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss')
    Add-Content -LiteralPath $Script:LogFile -Value "[$stamp] $Message" -Encoding UTF8
  } catch { }
}

Write-Log "=== Arcane Spire $Script:AppVersion start (PS $($PSVersionTable.PSVersion)) ==="

# ---------------------------------------------------------------- biblioteka
$Script:DefaultLibrary = @(
  [pscustomobject]@{
    id          = 'runy'
    name        = 'Runy Przeznaczenia'
    tagline     = 'RPG 3D · otwarty świat · polska produkcja'
    description = 'Trójwymiarowa gra RPG w przeglądarce. Kraina 1560 × 1560 m z górami, lasami i jeziorem, walka w czasie rzeczywistym, magia, rzemiosło i pięcioczęściowa fabuła o Mglistych Wrotach.'
    kind        = 'web'
    repo        = 'Agama12345/gta'
    branch      = 'arena/68dc2b6a-gta'
    path        = 'releases/runy-przeznaczenia'
    url         = ''
    fileName    = ''
    executable  = ''
  },
  [pscustomobject]@{
    id          = 'orerush'
    name        = 'OreRush'
    tagline     = 'gra dodana przez Ciebie'
    description = 'Dodaj repozytorium OreRush (przycisk „Dodaj grę”) albo wklej bezpośredni link do paczki. Launcher zapamięta ustawienie i będzie pobierał nowe wersje.'
    kind        = 'file'
    repo        = ''
    branch      = 'main'
    path        = ''
    url         = ''
    fileName    = ''
    executable  = ''
  }
)

function Load-Library {
  $games = @()
  if (Test-Path -LiteralPath $Script:LibraryFile) {
    try {
      $raw = Get-Content -LiteralPath $Script:LibraryFile -Raw -Encoding UTF8
      $data = $raw | ConvertFrom-Json
      foreach ($item in $data) { $games += $item }
    } catch {
      Write-Log "Nie udało się wczytać biblioteki: $($_.Exception.Message)"
    }
  }
  if ($Script:Library -isnot [System.Array]) { $Script:Library = @($Script:Library) }
  foreach ($def in $Script:DefaultLibrary) {
    $found = $false
    foreach ($g in $games) { if ($g.id -eq $def.id) { $found = $true } }
    if (-not $found) { $games += $def }
  }
  $Script:Library = $games
}

function Save-Library {
  try {
    $json = $Script:Library | ConvertTo-Json -Depth 6
    Set-Content -LiteralPath $Script:LibraryFile -Value $json -Encoding UTF8
  } catch {
    Write-Log "Nie udało się zapisać biblioteki: $($_.Exception.Message)"
  }
}

Load-Library

# ---------------------------------------------------------------- stan gier
function Get-GameDir {
  param($Game)
  return (Join-Path $Script:GamesDir $Game.id)
}

function Get-InstalledPath {
  param($Game)
  if ($Game.kind -eq 'web') { return (Join-Path (Get-GameDir $Game) 'www') }
  return (Get-GameDir $Game)
}

function Get-GameState {
  param($Game)
  $file = Join-Path (Get-GameDir $Game) 'state.json'
  if (-not (Test-Path -LiteralPath $file)) { return $null }
  try {
    return (Get-Content -LiteralPath $file -Raw -Encoding UTF8 | ConvertFrom-Json)
  } catch {
    return $null
  }
}

function Save-GameState {
  param($Game, $State)
  $dir = Get-GameDir $Game
  if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  $json = $State | ConvertTo-Json -Depth 6
  Set-Content -LiteralPath (Join-Path $dir 'state.json') -Value $json -Encoding UTF8
}

function Test-GameInstalled {
  param($Game)
  $state = Get-GameState $Game
  if ($state -eq $null) { return $false }
  if ($Game.kind -eq 'web') {
    return (Test-Path -LiteralPath (Join-Path (Get-InstalledPath $Game) 'index.html'))
  }
  if ($state.file -and (Test-Path -LiteralPath $state.file)) { return $true }
  return $false
}

# ---------------------------------------------------------------- sieć
function Get-RemoteSha {
  param([string]$Repo, [string]$Branch)
  if ([string]::IsNullOrWhiteSpace($Repo)) { return $null }
  if ([string]::IsNullOrWhiteSpace($Branch)) { $Branch = 'main' }
  $uri = "https://api.github.com/repos/$Repo/commits?sha=$Branch&per_page=1"
  try {
    $resp = Invoke-RestMethod -Uri $uri -Headers @{ 'User-Agent' = 'ArcaneSpire' } -TimeoutSec 20
    if ($resp -is [System.Array]) {
      if ($resp.Length -gt 0) { return $resp[0].sha }
      return $null
    }
    return $resp.sha
  } catch {
    Write-Log "API GitHub ($Repo@$Branch): $($_.Exception.Message)"
    return $null
  }
}

function Save-RemoteFile {
  param([string]$Url, [string]$Destination, [string]$Label)
  $folder = Split-Path -Parent $Destination
  if (-not (Test-Path -LiteralPath $folder)) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
  }
  $request = [System.Net.HttpWebRequest]::Create($Url)
  $request.UserAgent = 'ArcaneSpire'
  $request.Timeout = 30000
  $request.ReadWriteTimeout = 120000
  $response = $request.GetResponse()
  try {
    $total = $response.ContentLength
    $input = $response.GetResponseStream()
    $output = [System.IO.File]::Create($Destination)
    try {
      $buffer = New-Object byte[] 131072
      $sum = 0
      while ($true) {
        $read = $input.Read($buffer, 0, $buffer.Length)
        if ($read -le 0) { break }
        $output.Write($buffer, 0, $read)
        $sum += $read
        if ($total -gt 0) {
          $pct = [math]::Round(($sum / $total) * 100)
          $msg = "$Label — $([math]::Round($sum / 1MB, 1)) / $([math]::Round($total / 1MB, 1)) MB"
          Set-Progress $pct $msg
        }
        Pump-UI
      }
    } finally {
      $output.Close()
      $input.Close()
    }
  } finally {
    $response.Close()
  }
}

function Expand-Subfolder {
  param([string]$ZipPath, [string]$SubPath, [string]$Destination)
  if (Test-Path -LiteralPath $Destination) {
    Remove-Item -LiteralPath $Destination -Recurse -Force
  }
  New-Item -ItemType Directory -Force -Path $Destination | Out-Null

  $zip = [System.IO.Compression.ZipFile]::OpenRead($ZipPath)
  $needle = '/' + $SubPath.Trim('/') + '/'
  $count = 0
  try {
    foreach ($entry in $zip.Entries) {
      $idx = $entry.FullName.IndexOf($needle, [System.StringComparison]::OrdinalIgnoreCase)
      if ($idx -lt 0) { continue }
      $rel = $entry.FullName.Substring($idx + $needle.Length)
      if ([string]::IsNullOrEmpty($rel)) { continue }
      if ($rel.EndsWith('/')) { continue }
      $safe = $rel -replace '/', [System.IO.Path]::DirectorySeparatorChar
      $target = [System.IO.Path]::Combine($Destination, $safe)
      $parent = [System.IO.Path]::GetDirectoryName($target)
      if (-not (Test-Path -LiteralPath $parent)) {
        New-Item -ItemType Directory -Force -Path $parent | Out-Null
      }
      [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $target, $true)
      $count = $count + 1
    }
  } finally {
    $zip.Dispose()
  }
  return $count
}

# ---------------------------------------------------------------- sam aktualizacja
$Script:SelfRepo = 'Agama12345/gta'
$Script:SelfBranch = 'arena/68dc2b6a-gta'
$Script:SelfSubPath = 'launcher'
$Script:SelfVersionFile = Join-Path $Script:AppDir 'launcher-version.json'

function Get-LocalLauncherSha {
  if (Test-Path -LiteralPath $Script:SelfVersionFile) {
    try {
      $data = Get-Content -LiteralPath $Script:SelfVersionFile -Raw | ConvertFrom-Json
      return [string]$data.sha
    } catch { }
  }
  return $null
}

function Test-SelfUpdateAllowed {
  # uruchomiony prosto z repozytorium (tryb pracy nad kodem) — nie nadpisujemy plikow
  $normalized = $Script:AppDir.TrimEnd('\')
  $expected = (Join-Path $Script:DataDir 'app').TrimEnd('\')
  return ($normalized -ieq $expected)
}

function Restart-Launcher {
  try {
    $exe = (Get-Process -Id $PID).Path
    $script = Join-Path $Script:AppDir 'ArcaneSpire.ps1'
    Start-Process -FilePath $exe -ArgumentList @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-WindowStyle', 'Hidden', '-File', $script)
    Write-Log 'Restart launchera po aktualizacji.'
  } catch {
    Write-Log "Restart nieudany: $($_.Exception.Message)"
  }
  if ($Script:HasUI) { $Script:Form.Close() }
}

function Invoke-LauncherSelfUpdate {
  if (-not (Test-SelfUpdateAllowed)) { return $false }
  $sha = Get-RemoteSha $Script:SelfRepo $Script:SelfBranch
  if (-not $sha) { return $false }
  $localSha = Get-LocalLauncherSha
  if ($localSha -eq $sha) { return $false }

  Write-Log "Aktualizacja launchera: $localSha -> $sha"
  Set-Status 'Aktualizacja launchera…'
  $zip = Join-Path ([System.IO.Path]::GetTempPath()) ('as-self-' + [guid]::NewGuid().ToString('N') + '.zip')
  $tmp = Join-Path ([System.IO.Path]::GetTempPath()) ('as-self-' + [guid]::NewGuid().ToString('N'))
  $changed = 0
  try {
    Save-RemoteFile ("https://codeload.github.com/$($Script:SelfRepo)/zip/$sha") $zip 'Launcher'
    $count = Expand-Subfolder $zip $Script:SelfSubPath $tmp
    if ($count -lt 1) { throw 'Pusta paczka launchera.' }
    foreach ($file in (Get-ChildItem -LiteralPath $tmp -Recurse -File)) {
      $rel = $file.FullName.Substring($tmp.Length).TrimStart('\', '/')
      if ($rel -ieq 'launcher-version.json') { continue }
      $target = Join-Path $Script:AppDir $rel
      $parent = [System.IO.Path]::GetDirectoryName($target)
      if ($parent -and -not (Test-Path -LiteralPath $parent)) {
        New-Item -ItemType Directory -Force -Path $parent | Out-Null
      }
      Copy-Item -LiteralPath $file.FullName -Destination $target -Force
      $changed = $changed + 1
    }
    $info = [ordered]@{ sha = $sha; updated = (Get-Date).ToString('o') }
    ($info | ConvertTo-Json) | Set-Content -LiteralPath $Script:SelfVersionFile -Encoding UTF8
    Write-Log "Launcher zaktualizowany ($changed plikow)."
    return ($changed -gt 0)
  } catch {
    Write-Log "Aktualizacja launchera nieudana: $($_.Exception.Message)"
    return $false
  } finally {
    Remove-Item -LiteralPath $zip -Force -ErrorAction SilentlyContinue
    Remove-Item -LiteralPath $tmp -Recurse -Force -ErrorAction SilentlyContinue
  }
}

# ---------------------------------------------------------------- serwer HTTP
function Test-Port {
  param([int]$Port)
  $client = New-Object System.Net.Sockets.TcpClient
  try {
    $async = $client.BeginConnect('127.0.0.1', $Port, $null, $null)
    if (-not $async.AsyncWaitHandle.WaitOne(220)) { return $false }
    $client.EndConnect($async)
    return $true
  } catch {
    return $false
  } finally {
    $client.Close()
  }
}

function Get-FreePort {
  $listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Loopback, 0)
  $listener.Start()
  $port = ([System.Net.IPEndPoint]$listener.LocalEndpoint).Port
  $listener.Stop()
  return $port
}

function Start-GameServer {
  param($Game)
  $id = $Game.id
  if ($Script:ServerPorts.ContainsKey($id)) {
    if (Test-Port $Script:ServerPorts[$id]) { return $Script:ServerPorts[$id] }
    $Script:ServerPorts.Remove($id)
  }
  $root = Get-InstalledPath $Game
  $server = Join-Path $Script:AppDir 'serve.ps1'
  if (-not (Test-Path -LiteralPath $server)) { throw 'Brak pliku serve.ps1 obok launchera.' }
  $port = Get-FreePort
  $powerShellExe = (Get-Process -Id $PID).Path
  $arguments = "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$server`" -Port $port -Root `"$root`""
  $proc = Start-Process -FilePath $powerShellExe -ArgumentList $arguments -WindowStyle Hidden -PassThru
  $Script:ServerProcs[$id] = $proc
  for ($i = 0; $i -lt 80; $i = $i + 1) {
    if (Test-Port $port) { break }
    Start-Sleep -Milliseconds 100
    Pump-UI
  }
  $Script:ServerPorts[$id] = $port
  Write-Log "Serwer dla $id na porcie $port (root: $root)"
  return $port
}

function Stop-AllServers {
  foreach ($key in @($Script:ServerProcs.Keys)) {
    try { $proc = $Script:ServerProcs[$key]; if (-not $proc.HasExited) { $proc.Kill() } } catch { }
  }
  $Script:ServerProcs.Clear()
  $Script:ServerPorts.Clear()
}

# ---------------------------------------------------------------- przeglądarka
function Find-Browser {
  $candidates = @(
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe",
    "$env:ProgramFiles\BraveSoftware\Brave-Browser\Application\brave.exe"
  )
  foreach ($path in $candidates) {
    if ($path -and (Test-Path -LiteralPath $path)) { return $path }
  }
  return $null
}

# ---------------------------------------------------------------- instalacja
function Install-WebGame {
  param($Game, [string]$Sha)
  if ([string]::IsNullOrWhiteSpace($Sha)) { throw 'Brak informacji o wersji w repozytorium.' }
  $dir = Get-GameDir $Game
  if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  $zip = Join-Path $env:TEMP ("arcanespire-" + $Game.id + ".zip")
  $url = "https://codeload.github.com/$($Game.repo)/zip/$Sha"
  Write-Log "Pobieranie $url"
  Set-Status "Pobieranie paczki: $($Game.name)…"
  Set-Progress 4 'Łączenie z GitHub…'
  Save-RemoteFile -Url $url -Destination $zip -Label 'Pobieranie'
  Set-Progress 88 'Rozpakowywanie…'
  Set-Status 'Rozpakowywanie plików gry…'
  $count = Expand-Subfolder -ZipPath $zip -SubPath $Game.path -Destination (Join-Path $dir 'www')
  Remove-Item -LiteralPath $zip -Force -ErrorAction SilentlyContinue
  if ($count -lt 1) {
    throw "W repozytorium nie ma katalogu '$($Game.path)'."
  }
  $state = [pscustomobject]@{
    installed = $true
    sha       = $Sha
    updated   = (Get-Date).ToString('o')
    files     = $count
  }
  Save-GameState -Game $Game -State $state
  Set-Progress 100 "Zainstalowano: $count plików"
  Write-Log "Zainstalowano $($Game.id): $count plików @ $Sha"
  return $count
}

function Install-FileGame {
  param($Game)
  if ([string]::IsNullOrWhiteSpace($Game.url)) {
    throw 'Brak linku do pobrania. Użyj przycisku „Dodaj grę”, aby go ustawić.'
  }
  $dir = Get-GameDir $Game
  if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  $name = $Game.fileName
  if ([string]::IsNullOrWhiteSpace($name)) {
    $name = [System.IO.Path]::GetFileName(([System.Uri]$Game.url).AbsolutePath)
    if ([string]::IsNullOrWhiteSpace($name)) { $name = 'paczka-gry.zip' }
  }
  $dest = Join-Path $dir $name
  Set-Status "Pobieranie: $($Game.name)…"
  Set-Progress 2 'Łączenie…'
  Save-RemoteFile -Url $Game.url -Destination $dest -Label 'Pobieranie'
  $state = [pscustomobject]@{
    installed = $true
    sha       = ($Game.url)
    updated   = (Get-Date).ToString('o')
    files     = 1
    file      = $dest
  }
  Save-GameState -Game $Game -State $state
  Set-Progress 100 'Pobrano.'
  Set-Status "Pobrano: $name"
  return $dest
}

# ---------------------------------------------------------------- akcje UI
function Pump-UI {
  if ($Script:HasUI) {
    [System.Windows.Forms.Application]::DoEvents()
  }
}

function Set-Status {
  param([string]$Text)
  $Script:StatusText = $Text
  Write-Log $Text
  if ($Script:HasUI) {
    $Script:LblStatus.Text = $Text
    Pump-UI
  }
}

function Set-Progress {
  param([int]$Percent, [string]$Text)
  if (-not $Script:HasUI) { return }
  if ($Percent -lt 0) { $Percent = 0 }
  if ($Percent -gt 100) { $Percent = 100 }
  $Script:Progress.Value = $Percent
  if ($Text) {
    $Script:LblStatus.Text = $Text
    Write-Log $Text
  }
  Pump-UI
}

function Update-GameInfo {
  if ($Script:Selected -lt 0 -or $Script:Selected -ge $Script:Library.Count) { return }
  $game = $Script:Library[$Script:Selected]
  $Script:LblName.Text = $game.name
  $Script:LblTagline.Text = $game.tagline

  $Script:LblDesc.Text = $game.description

  $state = Get-GameState $game
  $installed = Test-GameInstalled $game
  $lines = @()
  if ($game.kind -eq 'web') {
    $lines += "Źródło: github.com/$($game.repo) · gałąź $($game.branch)"
    $lines += "Katalog paczki: $($game.path)"
  } elseif ($game.url) {
    $lines += "Link: $($game.url)"
  } else {
    $lines += 'Brak skonfigurowanego źródła — kliknij „Dodaj grę”.'
  }
  if ($installed) {
    $lines += "Zainstalowana wersja: $(if ($state.sha) { $state.sha.Substring(0, [Math]::Min(7, $state.sha.Length)) } else { 'nieznana' })"
    if ($state.updated) {
      $date = [datetime]::Parse($state.updated)
      $lines += "Ostatnia aktualizacja: $($date.ToString('yyyy-MM-dd HH:mm'))"
    }
  } else {
    $lines += 'Status: nie zainstalowano'
  }
  $Script:LblInfo.Text = ($lines -join "`n")

  if ($installed) { $Script:BtnPlay.Text = 'GRAJ' } else { $Script:BtnPlay.Text = 'ZAINSTALUJ' }
  $Script:BtnUpdate.Enabled = $true
  $Script:List.Invalidate()
  if ($Script:CurrentPage -eq 'details') { $Script:LblStatus.Text = 'Gotowe.' }
}

function Select-Game {
  param([int]$Index)
  $Script:Selected = $Index
  $Script:List.SelectedIndex = $Index
  Update-GameInfo
}

function Ensure-InstalledAndUpdated {
  param($Game, [bool]$AutoUpdate)
  $state = Get-GameState $Game
  $installed = Test-GameInstalled $Game

  if (-not $installed) {
    if ($Game.kind -eq 'web') {
      if ([string]::IsNullOrWhiteSpace($Game.repo)) { throw 'Ta gra nie ma skonfigurowanego repozytorium.' }
      Set-Status 'Sprawdzanie wersji w repozytorium…'
      $sha = Get-RemoteSha $Game.repo $Game.branch
      if (-not $sha) { throw 'Nie udało się odczytać wersji z GitHuba (sprawdź internet).' }
      Install-WebGame -Game $Game -Sha $sha
      return 'install'
    }
    Install-FileGame -Game $Game
    return 'install'
  }

  if ($AutoUpdate -and $Game.kind -eq 'web' -and $Game.repo) {
    Set-Status 'Sprawdzanie aktualizacji…'
    $sha = Get-RemoteSha $Game.repo $Game.branch
    if ($sha -and (-not $state.sha -or $state.sha -ne $sha)) {
      Set-Status "Nowa wersja $(($sha).Substring(0, 7)) — aktualizacja…"
      Install-WebGame -Game $Game -Sha $sha
      return 'update'
    }
  }
  return 'none'
}

function Launch-Game {
  param($Game)
  if ($Game.kind -eq 'web') {
    $root = Get-InstalledPath $Game
    if (-not (Test-Path -LiteralPath (Join-Path $root 'index.html'))) {
      throw 'Gra nie jest zainstalowana.'
    }
    $port = Start-GameServer $Game
    $url = "http://127.0.0.1:$port/index.html"
    $browser = Find-Browser
    if ($browser) {
      Start-Process -FilePath $browser -ArgumentList "--app=$url", '--window-size=1500,920', '--disable-features=Translate'
      Set-Status "Uruchomiono $($Game.name) w oknie aplikacji."
    } else {
      Start-Process $url
      Set-Status "Uruchomiono $($Game.name) w domyślnej przeglądarce."
    }
  } else {
    $state = Get-GameState $Game
    if ($state -and $state.file -and (Test-Path -LiteralPath $state.file)) {
      Start-Process -FilePath $state.file
      Set-Status "Uruchomiono plik gry: $($state.file)"
    } else {
      throw 'Gra nie jest jeszcze pobrana.'
    }
  }
}

function Invoke-Action {
  param([scriptblock]$Action, [string]$Name)
  if ($Script:Busy) { return }
  $Script:Busy = $true
  $Script:Form.Cursor = [System.Windows.Forms.Cursors]::WaitCursor
  try {
    & $Action
  } catch {
    $msg = $_.Exception.Message
    Write-Log "BŁĄD [$Name]: $msg"
    Set-Status "Błąd: $msg"
    [System.Windows.Forms.MessageBox]::Show(
      "$msg`n`nSzczegóły zapisano w:`n$($Script:LogFile)",
      'Arcane Spire',
      [System.Windows.Forms.MessageBoxButtons]::OK,
      [System.Windows.Forms.MessageBoxIcon]::Warning
    ) | Out-Null
  } finally {
    $Script:Busy = $false
    $Script:Form.Cursor = [System.Windows.Forms.Cursors]::Default
    Update-GameInfo
    Pump-UI
  }
}

# =====================================================================
#  TRYB TESTOWY (bez okna) — używany do diagnostyki
# =====================================================================
if ($SelfTest) {
  $ok = $true
  Write-Host '=== Arcane Spire — autotest ==='
  Write-Host "Katalog aplikacji: $Script:AppDir"
  Write-Host "Katalog danych:    $Script:DataDir"

  $server = Join-Path $Script:AppDir 'serve.ps1'
  if (Test-Path -LiteralPath $server) { Write-Host "[OK] serve.ps1 obecny" } else { Write-Host "[BŁĄD] brak serve.ps1"; $ok = $false }

  foreach ($game in $Script:Library) {
    Write-Host "Gra: $($game.name) [$($game.kind)] repo=$($game.repo) path=$($game.path)"
    if ($game.kind -eq 'web' -and $game.repo) {
      $sha = Get-RemoteSha $game.repo $game.branch
      if ($sha) {
        Write-Host "  [OK] GitHub odpowiada, HEAD = $($sha.Substring(0, 7))"
        try {
          $tmp = Join-Path $env:TEMP ('arcanetest-' + $game.id)
          if (Test-Path -LiteralPath $tmp) { Remove-Item -LiteralPath $tmp -Recurse -Force }
          $zip = Join-Path $env:TEMP ('arcanetest-' + $game.id + '.zip')
          Save-RemoteFile -Url "https://codeload.github.com/$($game.repo)/zip/$sha" -Destination $zip -Label 'Test'
          $n = Expand-Subfolder -ZipPath $zip -SubPath $game.path -Destination $tmp
          Write-Host "  [OK] rozpakowano $n plików do $tmp"
          if ($n -lt 1) { $ok = $false }
          Get-ChildItem -LiteralPath $tmp | Select-Object -First 6 | ForEach-Object { Write-Host "       $($_.Name)" }
        } catch {
          Write-Host "  [BŁĄD] $($_.Exception.Message)"
          $ok = $false
        }
      } else {
        Write-Host '  [BŁĄD] brak odpowiedzi z API GitHub'
        $ok = $false
      }
    }
  }

  $browser = Find-Browser
  if ($browser) { Write-Host "[OK] przeglądarka: $browser" } else { Write-Host '[!] nie znaleziono Edge/Chrome — gra otworzy się w domyślnej przeglądarce' }

  if ($ok) { Write-Host '=== AUTOTEST: OK ==='; exit 0 } else { Write-Host '=== AUTOTEST: BŁĘDY ==='; exit 1 }
}

# =====================================================================
#  INTERFEJS
# =====================================================================
$Script:HasUI = $true
$Script:Busy = $false
$Script:Selected = 0
$Script:ServerPorts = @{}
$Script:ServerProcs = @{}
$Script:CurrentPage = 'details'

$colBg = [System.Drawing.Color]::FromArgb(11, 13, 16)
$colPanel = [System.Drawing.Color]::FromArgb(20, 24, 29)
$colPanel2 = [System.Drawing.Color]::FromArgb(27, 32, 39)
$colAccent = [System.Drawing.Color]::FromArgb(168, 107, 240)
$colAccentDark = [System.Drawing.Color]::FromArgb(96, 56, 148)
$colText = [System.Drawing.Color]::FromArgb(233, 226, 211)
$colMuted = [System.Drawing.Color]::FromArgb(150, 145, 136)
$colGood = [System.Drawing.Color]::FromArgb(126, 200, 140)

$form = New-Object System.Windows.Forms.Form
$form.Text = 'Arcane Spire'
$form.Size = New-Object System.Drawing.Size(1120, 700)
$form.MinimumSize = New-Object System.Drawing.Size(1000, 640)
$form.StartPosition = 'CenterScreen'
$form.BackColor = $colBg
$form.ForeColor = $colText
$form.Font = New-Object System.Drawing.Font('Segoe UI', 9)
$Script:Form = $form

$iconPath = Join-Path $Script:AppDir 'ArcaneSpire.ico'
if (-not (Test-Path -LiteralPath $iconPath)) {
  $iconPath = Join-Path $Script:AppDir 'ui\ArcaneSpire.ico'
}
if (Test-Path -LiteralPath $iconPath) {
  try { $form.Icon = New-Object System.Drawing.Icon($iconPath) } catch { }
}

# ---------- nagłówek
$header = New-Object System.Windows.Forms.Panel
$header.Dock = 'Top'
$header.Height = 104
$header.BackColor = $colPanel
$form.Controls.Add($header)

$logoPath = Join-Path $Script:AppDir 'ui\icon-128.png'
if (-not (Test-Path -LiteralPath $logoPath)) { $logoPath = Join-Path $Script:AppDir 'icon-128.png' }
if (Test-Path -LiteralPath $logoPath) {
  $logo = New-Object System.Windows.Forms.PictureBox
  $logo.Image = [System.Drawing.Image]::FromFile($logoPath)
  $logo.SizeMode = 'Zoom'
  $logo.Location = New-Object System.Drawing.Point(24, 18)
  $logo.Size = New-Object System.Drawing.Size(64, 64)
  $logo.BackColor = $colPanel
  $header.Controls.Add($logo)
}

$title = New-Object System.Windows.Forms.Label
$title.Text = 'ARCANE SPIRE'
$title.Font = New-Object System.Drawing.Font('Segoe UI', 22, [System.Drawing.FontStyle]::Bold)
$title.ForeColor = $colAccent
$title.AutoSize = $true
$title.Location = New-Object System.Drawing.Point(104, 26)
$header.Controls.Add($title)

$subtitle = New-Object System.Windows.Forms.Label
$subtitle.Text = 'biblioteka gier · aktualizacje z GitHuba · wersja ' + $Script:AppVersion
$subtitle.ForeColor = $colMuted
$subtitle.AutoSize = $true
$subtitle.Location = New-Object System.Drawing.Point(108, 64)
$header.Controls.Add($subtitle)

# ---------- lista gier (lewa kolumna)
$leftPanel = New-Object System.Windows.Forms.Panel
$leftPanel.Dock = 'Left'
$leftPanel.Width = 340
$leftPanel.BackColor = $colBg
$leftPanel.Padding = New-Object System.Windows.Forms.Padding(16, 16, 8, 16)
$form.Controls.Add($leftPanel)

$libraryLabel = New-Object System.Windows.Forms.Label
$libraryLabel.Text = 'BIBLIOTEKA'
$libraryLabel.ForeColor = $colMuted
$libraryLabel.Font = New-Object System.Drawing.Font('Segoe UI', 8.5, [System.Drawing.FontStyle]::Bold)
$libraryLabel.Dock = 'Top'
$libraryLabel.Height = 26
$leftPanel.Controls.Add($libraryLabel)

$list = New-Object System.Windows.Forms.ListBox
$list.Dock = 'Fill'
$list.BackColor = $colPanel
$list.ForeColor = $colText
$list.BorderStyle = 'None'
$list.DrawMode = 'OwnerDrawFixed'
$list.ItemHeight = 62
$list.Font = New-Object System.Drawing.Font('Segoe UI', 10)
$Script:List = $list
$leftPanel.Controls.Add($list)

$Script:FontListName = New-Object System.Drawing.Font('Segoe UI', 11, [System.Drawing.FontStyle]::Bold)
$Script:FontListSmall = New-Object System.Drawing.Font('Segoe UI', 8)
$Script:BrushName = New-Object System.Drawing.SolidBrush($colText)
$Script:BrushSub = New-Object System.Drawing.SolidBrush($colMuted)
$Script:BrushOk = New-Object System.Drawing.SolidBrush($colGood)
$Script:BrushIdle = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(110, 100, 92))
$Script:BrushSel = New-Object System.Drawing.SolidBrush($colPanel2)
$Script:BrushAccent = New-Object System.Drawing.SolidBrush($colAccent)

$list.Add_DrawItem({
  param($sender, $e)
  $g = $e.Graphics
  $index = $e.Index
  if ($index -lt 0 -or $index -ge $Script:Library.Count) { return }
  $game = $Script:Library[$index]
  $selected = (([int]$e.State -band [int][System.Windows.Forms.DrawItemState]::Selected) -ne 0)
  $rect = $e.Bounds
  if ($selected) {
    $g.FillRectangle($Script:BrushSel, $rect)
    $g.FillRectangle($Script:BrushAccent, (New-Object System.Drawing.Rectangle($rect.X, $rect.Y + 6, 3, $rect.Height - 12)))
  }
  $installed = Test-GameInstalled $game
  if ($installed) {
    $brush = $Script:BrushOk
    $statusText = 'zainstalowana'
  } else {
    $brush = $Script:BrushIdle
    $statusText = 'nie zainstalowano'
  }
  $g.DrawString($game.name, $Script:FontListName, $Script:BrushName, ($rect.X + 16), ($rect.Y + 10))
  $g.DrawString($game.tagline, $Script:FontListSmall, $Script:BrushSub, ($rect.X + 16), ($rect.Y + 33))
  $g.DrawString($statusText, $Script:FontListSmall, $brush, ($rect.X + 16), ($rect.Y + 46))
})

$list.Add_SelectedIndexChanged({
  if ($Script:List.SelectedIndex -ge 0) {
    Select-Game -Index $Script:List.SelectedIndex
  }
})

# ---------- panel szczegółów
$detail = New-Object System.Windows.Forms.Panel
$detail.Dock = 'Fill'
$detail.BackColor = $colBg
$detail.Padding = New-Object System.Windows.Forms.Padding(16, 16, 24, 16)
$form.Controls.Add($detail)

$lblName = New-Object System.Windows.Forms.Label
$lblName.Text = ''
$lblName.Font = New-Object System.Drawing.Font('Segoe UI', 20, [System.Drawing.FontStyle]::Bold)
$lblName.ForeColor = $colText
$lblName.AutoSize = $true
$lblName.Location = New-Object System.Drawing.Point(0, 0)
$detail.Controls.Add($lblName)
$Script:LblName = $lblName

$lblTagline = New-Object System.Windows.Forms.Label
$lblTagline.Text = ''
$lblTagline.ForeColor = $colAccent
$lblTagline.AutoSize = $true
$lblTagline.Location = New-Object System.Drawing.Point(3, 42)
$detail.Controls.Add($lblTagline)
$Script:LblTagline = $lblTagline

$lblDesc = New-Object System.Windows.Forms.Label
$lblDesc.Text = ''
$lblDesc.ForeColor = $colMuted
$lblDesc.Location = New-Object System.Drawing.Point(3, 74)
$lblDesc.Size = New-Object System.Drawing.Size(690, 84)
$lblDesc.Anchor = 'Top,Left,Right'
$detail.Controls.Add($lblDesc)
$Script:LblDesc = $lblDesc

$lblInfo = New-Object System.Windows.Forms.Label
$lblInfo.Text = ''
$lblInfo.ForeColor = [System.Drawing.Color]::FromArgb(120, 116, 108)
$lblInfo.Location = New-Object System.Drawing.Point(3, 168)
$lblInfo.Size = New-Object System.Drawing.Size(690, 96)
$lblInfo.Anchor = 'Top,Left,Right'
$lblInfo.Font = New-Object System.Drawing.Font('Consolas', 8.5)
$detail.Controls.Add($lblInfo)
$Script:LblInfo = $lblInfo

function New-SpireButton {
  param([string]$Text, [int]$X, [int]$Y, [int]$W, [int]$H, [bool]$Primary)
  $button = New-Object System.Windows.Forms.Button
  $button.Text = $Text
  $button.Size = New-Object System.Drawing.Size($W, $H)
  $button.Location = New-Object System.Drawing.Point($X, $Y)
  $button.FlatStyle = 'Flat'
  $button.FlatAppearance.BorderSize = 1
  $button.FlatAppearance.BorderColor = $colAccentDark
  $button.Font = New-Object System.Drawing.Font('Segoe UI', 10, [System.Drawing.FontStyle]::Bold)
  $button.ForeColor = $colText
  $button.BackColor = $colPanel2
  $button.Cursor = [System.Windows.Forms.Cursors]::Hand
  if ($Primary) {
    $button.BackColor = $colAccentDark
    $button.FlatAppearance.BorderColor = $colAccent
  }
  $button.FlatAppearance.MouseOverBackColor = $colAccent
  return $button
}

$btnPlay = New-SpireButton -Text 'GRAJ' -X 3 -Y 286 -W 210 -H 56 -Primary $true
$detail.Controls.Add($btnPlay)
$Script:BtnPlay = $btnPlay

$btnUpdate = New-SpireButton -Text 'AKTUALIZUJ' -X 223 -Y 286 -W 150 -H 56 -Primary $false
$detail.Controls.Add($btnUpdate)
$Script:BtnUpdate = $btnUpdate

$btnFolder = New-SpireButton -Text 'FOLDER' -X 383 -Y 286 -W 120 -H 56 -Primary $false
$detail.Controls.Add($btnFolder)

$btnAdd = New-SpireButton -Text 'DODAJ GRĘ' -X 513 -Y 286 -W 150 -H 56 -Primary $false
$detail.Controls.Add($btnAdd)

$chkAuto = New-Object System.Windows.Forms.CheckBox
$chkAuto.Text = 'Aktualizuj automatycznie przed uruchomieniem'
$chkAuto.ForeColor = $colMuted
$chkAuto.AutoSize = $true
$chkAuto.Checked = $true
$chkAuto.Location = New-Object System.Drawing.Point(3, 356)
$detail.Controls.Add($chkAuto)
$Script:ChkAuto = $chkAuto

$lblStatus = New-Object System.Windows.Forms.Label
$lblStatus.Text = 'Gotowe.'
$lblStatus.ForeColor = $colMuted
$lblStatus.Location = New-Object System.Drawing.Point(3, 400)
$lblStatus.Size = New-Object System.Drawing.Size(700, 22)
$lblStatus.Anchor = 'Top,Left,Right'
$detail.Controls.Add($lblStatus)
$Script:LblStatus = $lblStatus

$progress = New-Object System.Windows.Forms.ProgressBar
$progress.Minimum = 0
$progress.Maximum = 100
$progress.Value = 0
$progress.Location = New-Object System.Drawing.Point(3, 424)
$progress.Size = New-Object System.Drawing.Size(700, 10)
$progress.Anchor = 'Top,Left,Right'
$detail.Controls.Add($progress)
$Script:Progress = $progress

$hint = New-Object System.Windows.Forms.Label
$hint.Text = 'Gry pobierane są z GitHuba i instalowane lokalnie. Po każdej zmianie kodu w repozytorium launcher wykrywa nowy commit i aktualizuje pliki przed startem.'
$hint.ForeColor = [System.Drawing.Color]::FromArgb(100, 98, 92)
$hint.Location = New-Object System.Drawing.Point(3, 448)
$hint.Size = New-Object System.Drawing.Size(700, 60)
$hint.Anchor = 'Top,Left,Right'
$detail.Controls.Add($hint)

$btnCheck = New-SpireButton -Text 'SPRAWDŹ AKTUALIZACJE' -X 3 -Y 514 -W 230 -H 40 -Primary $false
$detail.Controls.Add($btnCheck)
$btnCheckAll = $btnCheck

$btnOpenData = New-SpireButton -Text 'OTWÓRZ KATALOG GIER' -X 241 -Y 514 -W 210 -H 40 -Primary $false
$detail.Controls.Add($btnOpenData)

# ---------- pasek dolny
$footer = New-Object System.Windows.Forms.Panel
$footer.Dock = 'Bottom'
$footer.Height = 30
$footer.BackColor = $colPanel
$form.Controls.Add($footer)

$footerText = New-Object System.Windows.Forms.Label
$footerText.Text = "Arcane Spire $($Script:AppVersion)  ·  dane: $($Script:DataDir)"
$footerText.ForeColor = [System.Drawing.Color]::FromArgb(120, 116, 108)
$footerText.AutoSize = $true
$footerText.Location = New-Object System.Drawing.Point(16, 7)
$footer.Controls.Add($footerText)

# ---------- obsługa zdarzeń
$btnPlay.Add_Click({
  param($sender, $e)
  $game = $Script:Library[$Script:Selected]
  Invoke-Action -Name 'play' -Action {
    $result = Ensure-InstalledAndUpdated -Game $game -AutoUpdate $Script:ChkAuto.Checked
    if ($result -eq 'install' -and $game.kind -eq 'file') {
      Set-Status 'Pobrano plik gry. Kliknij GRAJ, aby go uruchomić.'
      return
    }
    Launch-Game -Game $game
  }
})

$btnUpdate.Add_Click({
  param($sender, $e)
  $game = $Script:Library[$Script:Selected]
  Invoke-Action -Name 'update' -Action {
    if ($game.kind -eq 'web') {
      if ([string]::IsNullOrWhiteSpace($game.repo)) { throw 'Ustaw repozytorium przyciskiem „Dodaj grę”.' }
      Set-Status 'Sprawdzanie wersji…'
      $sha = Get-RemoteSha $game.repo $game.branch
      if (-not $sha) { throw 'Nie udało się odczytać wersji z GitHuba.' }
      $state = Get-GameState $game
      if ($state -and $state.sha -eq $sha -and (Test-GameInstalled $game)) {
        Set-Status "Masz najnowszą wersję ($($sha.Substring(0,7)))."
        Set-Progress 100 'Aktualne.'
        return
      }
      Install-WebGame -Game $game -Sha $sha
      Set-Status "Zaktualizowano do $($sha.Substring(0,7))."
    } else {
      Install-FileGame -Game $game
    }
  }
})

$btnFolder.Add_Click({
  param($sender, $e)
  $game = $Script:Library[$Script:Selected]
  $dir = Get-GameDir $game
  if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  Start-Process -FilePath 'explorer.exe' -ArgumentList "`"$dir`""
})

$btnOpenData.Add_Click({
  Start-Process -FilePath 'explorer.exe' -ArgumentList "`"$($Script:GamesDir)`""
})

$btnCheck.Add_Click({
  Invoke-Action -Name 'check' -Action {
    if (Invoke-LauncherSelfUpdate) {
      Set-Status 'Launcher zaktualizowany — uruchamiam ponownie…'
      Start-Sleep -Milliseconds 600
      Restart-Launcher
      return
    }
    $found = 0
    foreach ($game in $Script:Library) {
      if ($game.kind -ne 'web' -or [string]::IsNullOrWhiteSpace($game.repo)) { continue }
      Set-Status "Sprawdzanie: $($game.name)…"
      $sha = Get-RemoteSha $game.repo $game.branch
      if (-not $sha) { continue }
      $state = Get-GameState $game
      if (-not $state -or $state.sha -ne $sha) {
        Set-Status "Nowa wersja $($game.name): $($sha.Substring(0,7)) — instaluję…"
        Install-WebGame -Game $game -Sha $sha
        $found = $found + 1
      }
    }
    if ($found -eq 0) {
      Set-Progress 100 'Wszystko aktualne.'
      Set-Status 'Wszystkie gry są aktualne.'
    } else {
      Set-Status "Zaktualizowano gier: $found."
    }
    Update-GameInfo
  }
})

$btnAdd.Add_Click({
  param($sender, $e)
  $dialog = New-Object System.Windows.Forms.Form
  $dialog.Text = 'Dodaj grę'
  $dialog.Size = New-Object System.Drawing.Size(560, 400)
  $dialog.StartPosition = 'CenterParent'
  $dialog.BackColor = $colPanel
  $dialog.ForeColor = $colText
  $dialog.FormBorderStyle = 'FixedDialog'
  $dialog.MaximizeBox = $false
  $dialog.MinimizeBox = $false
  $dialog.Font = New-Object System.Drawing.Font('Segoe UI', 9)

  $labels = @('Nazwa gry', 'Repozytorium GitHub (owner/repo)', 'Gałąź', 'Katalog paczki w repo', 'Link bezpośredni (opcjonalnie)')
  $inputs = @()
  $y = 18
  for ($i = 0; $i -lt $labels.Length; $i++) {
    $lb = New-Object System.Windows.Forms.Label
    $lb.Text = $labels[$i]
    $lb.ForeColor = $colMuted
    $lb.AutoSize = $true
    $lb.Location = New-Object System.Drawing.Point(18, $y)
    $dialog.Controls.Add($lb)
    $tb = New-Object System.Windows.Forms.TextBox
    $tb.Location = New-Object System.Drawing.Point(18, ($y + 20))
    $tb.Size = New-Object System.Drawing.Size(505, 24)
    $tb.BackColor = $colPanel2
    $tb.ForeColor = $colText
    $tb.BorderStyle = 'FixedSingle'
    $dialog.Controls.Add($tb)
    $inputs += $tb
    $y = $y + 60
  }
  $inputs[0].Text = 'Nowa gra'
  $inputs[2].Text = 'main'
  $inputs[3].Text = 'releases/paczka'

  $note = New-Object System.Windows.Forms.Label
  $note.Text = 'Wypełnij repozytorium i katalog (gra przeglądarkowa) albo sam link bezpośredni (plik do pobrania).'
  $note.ForeColor = [System.Drawing.Color]::FromArgb(120, 116, 108)
  $note.Location = New-Object System.Drawing.Point(18, ($y - 8))
  $note.Size = New-Object System.Drawing.Size(505, 34)
  $dialog.Controls.Add($note)

  $okBtn = New-Object System.Windows.Forms.Button
  $okBtn.Text = 'Dodaj'
  $okBtn.DialogResult = [System.Windows.Forms.DialogResult]::OK
  $okBtn.Location = New-Object System.Drawing.Point(330, ($y + 30))
  $okBtn.Size = New-Object System.Drawing.Size(190, 34)
  $okBtn.FlatStyle = 'Flat'
  $okBtn.BackColor = $colAccentDark
  $okBtn.ForeColor = $colText
  $dialog.Controls.Add($okBtn)

  $cancel = New-Object System.Windows.Forms.Button
  $cancel.Text = 'Anuluj'
  $cancel.DialogResult = [System.Windows.Forms.DialogResult]::Cancel
  $cancel.Location = New-Object System.Drawing.Point(230, ($y + 30))
  $cancel.Size = New-Object System.Drawing.Size(90, 34)
  $cancel.FlatStyle = 'Flat'
  $dialog.Controls.Add($cancel)

  $dialog.AcceptButton = $okBtn
  $dialog.CancelButton = $cancel

  $result = $dialog.ShowDialog($Script:Form)
  if ($result -ne [System.Windows.Forms.DialogResult]::OK) { return }

  $name = $inputs[0].Text.Trim()
  $repo = $inputs[1].Text.Trim()
  $branch = $inputs[2].Text.Trim()
  $path = $inputs[3].Text.Trim()
  $url = $inputs[4].Text.Trim()

  $kind = 'web'
  if (-not [string]::IsNullOrWhiteSpace($url)) { $kind = 'file' }
  if ($kind -eq 'web' -and [string]::IsNullOrWhiteSpace($repo)) {
    [System.Windows.Forms.MessageBox]::Show('Podaj repozytorium (owner/repo) albo link bezpośredni.', 'Arcane Spire') | Out-Null
    return
  }
  $id = ($name.ToLowerInvariant() -replace '[^a-z0-9]+', '-').Trim('-')
  if ([string]::IsNullOrWhiteSpace($id)) { $id = 'gra-' + (Get-Random -Maximum 9999) }

  $existing = $null
  foreach ($g in $Script:Library) { if ($g.id -eq $id) { $existing = $g } }
  if ($existing -eq $null) {
    $entry = [pscustomobject]@{
      id          = $id
      name        = $name
      tagline     = 'gra dodana przez Ciebie'
      description = 'Gra dodana w launcherze.'
      kind        = $kind
      repo        = $repo
      branch      = $branch
      path        = $path
      url         = $url
      fileName    = ''
      executable  = ''
    }
    $Script:Library = @($Script:Library) + $entry
  } else {
    $existing.name = $name
    $existing.kind = $kind
    $existing.repo = $repo
    $existing.branch = $branch
    $existing.path = $path
    $existing.url = $url
  }
  Save-Library
  $Script:List.Items.Clear()
  foreach ($g in $Script:Library) { $Script:List.Items.Add($g.name) | Out-Null }
  Select-Game -Index ($Script:Library.Count - 1)
  Set-Status 'Dodano grę do biblioteki.'
})

$form.Add_Shown({
  foreach ($g in $Script:Library) { $Script:List.Items.Add($g.name) | Out-Null }
  if ($Script:List.Items.Count -gt 0) {
    $Script:List.SelectedIndex = 0
    Select-Game -Index 0
  }
  Set-Status 'Gotowe. Wybierz grę i kliknij GRAJ.'
  # cicha kontrola aktualizacji zaraz po otwarciu okna
  $Script:Form.BeginInvoke([System.Action]{
    Invoke-Action -Name 'startup-check' -Action {
      if (Invoke-LauncherSelfUpdate) {
        Set-Status 'Launcher zaktualizowany — uruchamiam ponownie…'
        Start-Sleep -Milliseconds 600
        Restart-Launcher
        return
      }
      foreach ($game in $Script:Library) {
        if ($game.kind -ne 'web' -or [string]::IsNullOrWhiteSpace($game.repo)) { continue }
        if (-not (Test-GameInstalled $game)) { continue }
        Set-Status "Sprawdzanie aktualizacji: $($game.name)…"
        $sha = Get-RemoteSha $game.repo $game.branch
        if (-not $sha) { continue }
        $state = Get-GameState $game
        if ($state.sha -ne $sha) {
          Install-WebGame -Game $game -Sha $sha
          Set-Status "Zaktualizowano $($game.name) do $($sha.Substring(0,7))."
        } else {
          Set-Status 'Gra jest aktualna.'
        }
        Update-GameInfo
      }
    }
  }) | Out-Null
})

$form.Add_FormClosing({
  Stop-AllServers
  Write-Log '=== Arcane Spire koniec ==='
})

# automatyczne sprawdzanie aktualizacji co 5 minut
$timer = New-Object System.Windows.Forms.Timer
$timer.Interval = 300000
$timer.Add_Tick({
  if ($Script:Busy) { return }
  Invoke-Action -Name 'auto-check' -Action {
    foreach ($game in $Script:Library) {
      if ($game.kind -ne 'web' -or [string]::IsNullOrWhiteSpace($game.repo)) { continue }
      if (-not (Test-GameInstalled $game)) { continue }
      $sha = Get-RemoteSha $game.repo $game.branch
      if (-not $sha) { continue }
      $state = Get-GameState $game
      if ($state.sha -ne $sha) {
        Set-Status "Wykryto nową wersję $($game.name) — aktualizuję w tle…"
        Install-WebGame -Game $game -Sha $sha
        Set-Status "Zaktualizowano $($game.name) do $($sha.Substring(0,7))."
      }
    }
    Update-GameInfo
    if (Invoke-LauncherSelfUpdate) {
      Set-Status 'Launcher zaktualizowany — uruchamiam ponownie…'
      Start-Sleep -Milliseconds 600
      Restart-Launcher
    }
  }
})
$timer.Start()

[void]$form.ShowDialog()
