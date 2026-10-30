# =====================================================================
#  ARCANE SPIRE — instalator (jeden plik)
#
#  Uzycie (PowerShell, jedno polecenie):
#    irm https://raw.githubusercontent.com/Agama12345/gta/arena/68dc2b6a-gta/launcher/install.ps1 | iex
#
#  Instaluje launcher w %LOCALAPPDATA%\ArcaneSpire\app,
#  tworzy skrot na pulpicie i w menu Start, potem go uruchamia.
# =====================================================================
[CmdletBinding()]
param(
  [string]$Repo = 'Agama12345/gta',
  [string]$Branch = 'arena/68dc2b6a-gta',
  [switch]$NoShortcut,
  [switch]$NoLaunch
)

$ErrorActionPreference = 'Stop'
try {
  [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12
} catch { }

Add-Type -AssemblyName System.IO.Compression.FileSystem

$appDir = Join-Path $env:LOCALAPPDATA 'ArcaneSpire\app'
if (-not (Test-Path -LiteralPath $appDir)) {
  New-Item -ItemType Directory -Force -Path $appDir | Out-Null
}

Write-Host ''
Write-Host '  ARCANE SPIRE - instalacja launchera' -ForegroundColor Magenta
Write-Host "  repozytorium: $Repo ($Branch)"
Write-Host ''

# --- ustalenie wersji
$sha = $null
try {
  $api = "https://api.github.com/repos/$Repo/commits?sha=$Branch&per_page=1"
  $resp = Invoke-RestMethod -Uri $api -Headers @{ 'User-Agent' = 'ArcaneSpire' } -TimeoutSec 20
  if ($resp -is [System.Array]) { $sha = $resp[0].sha } else { $sha = $resp.sha }
} catch {
  Write-Host '  [!] Nie udalo sie odczytac wersji z API GitHub - uzywam galezi.' -ForegroundColor Yellow
}

if ($sha) {
  $zipUrl = "https://codeload.github.com/$Repo/zip/$sha"
} else {
  $zipUrl = "https://codeload.github.com/$Repo/zip/refs/heads/$Branch"
}

$zip = Join-Path $env:TEMP 'arcanespire-install.zip'
Write-Host '  Pobieranie launchera...'
$progress = $ProgressPreference
$ProgressPreference = 'SilentlyContinue'
Invoke-WebRequest -Uri $zipUrl -OutFile $zip -UseBasicParsing -TimeoutSec 180
$ProgressPreference = $progress

Write-Host '  Rozpakowywanie...'
$archive = [System.IO.Compression.ZipFile]::OpenRead($zip)
$needle = '/launcher/'
$count = 0
try {
  foreach ($entry in $archive.Entries) {
    $idx = $entry.FullName.IndexOf($needle, [System.StringComparison]::OrdinalIgnoreCase)
    if ($idx -lt 0) { continue }
    $rel = $entry.FullName.Substring($idx + $needle.Length)
    if ([string]::IsNullOrEmpty($rel) -or $rel.EndsWith('/')) { continue }
    $target = Join-Path $appDir ($rel -replace '/', '\')
    $parent = Split-Path -Parent $target
    if (-not (Test-Path -LiteralPath $parent)) {
      New-Item -ItemType Directory -Force -Path $parent | Out-Null
    }
    [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $target, $true)
    $count = $count + 1
  }
} finally {
  $archive.Dispose()
  Remove-Item -LiteralPath $zip -Force -ErrorAction SilentlyContinue
}

if ($count -lt 1) {
  throw 'Paczka nie zawiera katalogu launcher/. Sprawdz nazwe repozytorium i galezi.'
}
Write-Host "  Zainstalowano $count plikow w $appDir" -ForegroundColor Green

$ps1 = Join-Path $appDir 'ArcaneSpire.ps1'
$ico = Join-Path $appDir 'ArcaneSpire.ico'
$exe = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
$args = "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$ps1`""

# --- skroty
if (-not $NoShortcut) {
  $shell = New-Object -ComObject WScript.Shell
  $targets = @(
    (Join-Path ([Environment]::GetFolderPath('Desktop')) 'Arcane Spire.lnk'),
    (Join-Path ([Environment]::GetFolderPath('Programs')) 'Arcane Spire.lnk')
  )
  foreach ($lnkPath in $targets) {
    try {
      $lnk = $shell.CreateShortcut($lnkPath)
      $lnk.TargetPath = $exe
      $lnk.Arguments = $args
      $lnk.WorkingDirectory = $appDir
      if (Test-Path -LiteralPath $ico) { $lnk.IconLocation = $ico }
      $lnk.Description = 'Arcane Spire - biblioteka gier'
      $lnk.Save()
      Write-Host "  Skrot: $lnkPath"
    } catch {
      Write-Host "  [!] Nie udalo sie utworzyc skrotu: $lnkPath" -ForegroundColor Yellow
    }
  }
}

Write-Host ''
Write-Host '  Gotowe. Uruchamiam launcher...' -ForegroundColor Green
Write-Host ''

if (-not $NoLaunch) {
  Start-Process -FilePath $exe -ArgumentList $args
}
