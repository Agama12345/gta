# =====================================================================
#  ARCANE SPIRE — diagnostyka
#
#  Zbiera wszystko, co potrzebne do ustalenia, dlaczego launcher nie
#  startuje: wynik autotestu, log startu, log launchera, błędy z
#  dziennika zdarzeń Windows. Wynik zapisuje na pulpicie jako
#  "diagnostyka.txt".
#
#  Uruchomienie: kliknij dwa razy diagnostyka.cmd
# =====================================================================
$ErrorActionPreference = 'SilentlyContinue'

$desktop = [Environment]::GetFolderPath('Desktop')
if ([string]::IsNullOrWhiteSpace($desktop)) { $desktop = $env:USERPROFILE }
$outFile = Join-Path $desktop 'diagnostyka.txt'

$here = Split-Path -Parent $PSCommandPath
$exe = Join-Path $here 'ArcaneSpire.exe'
if (-not (Test-Path -LiteralPath $exe)) {
    $candidate = Get-ChildItem -Path $here, $env:USERPROFILE -Filter 'ArcaneSpire.exe' -Recurse -Depth 3 -ErrorAction SilentlyContinue |
        Select-Object -First 1
    if ($candidate) { $exe = $candidate.FullName }
}

$lines = New-Object System.Collections.Generic.List[string]
function Add-Line([string]$text) { $lines.Add($text); Write-Host $text }

Add-Line '===== ARCANE SPIRE — diagnostyka ====='
Add-Line ("data:      " + (Get-Date).ToString('yyyy-MM-dd HH:mm:ss'))
Add-Line ("system:    " + [Environment]::OSVersion.VersionString)
Add-Line ("64-bit:    " + [Environment]::Is64BitOperatingSystem)
Add-Line ("użytkownik:" + $env:USERNAME)
Add-Line ''

# --- .NET Framework
Add-Line '--- .NET Framework ---'
try {
    $release = (Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\NET Framework Setup\NDP\v4\Full' -ErrorAction Stop).Release
    $version = switch ($release) {
        { $_ -ge 533320 } { '4.8.1 lub nowszy'; break }
        { $_ -ge 528040 } { '4.8'; break }
        { $_ -ge 461808 } { '4.7.2'; break }
        { $_ -ge 460798 } { '4.7'; break }
        default { 'starsza niż 4.7' }
    }
    Add-Line ("Release:   $release ($version)")
    if ($release -lt 528040) { Add-Line 'UWAGA: launcher wymaga .NET Framework 4.8!' }
} catch {
    Add-Line 'Nie udało się odczytać wersji .NET Framework z rejestru.'
}
Add-Line ''

# --- plik exe
Add-Line '--- plik launchera ---'
if (Test-Path -LiteralPath $exe) {
    $info = Get-Item -LiteralPath $exe
    Add-Line ("ścieżka:   " + $info.FullName)
    Add-Line ("rozmiar:   " + $info.Length + " B")
    Add-Line ("wersja:    " + $info.VersionInfo.FileVersion)
    Add-Line ("MOTW:      " + (Get-Item -LiteralPath $exe -Stream Zone.Identifier -ErrorAction SilentlyContinue))
    # zdejmij blokadę pobrania — to najczęstsza przyczyna "nic się nie dzieje"
    Unblock-File -LiteralPath $exe
    Add-Line 'Odblokowano plik (Unblock-File).'
} else {
    Add-Line 'NIE ZNALEZIONO ArcaneSpire.exe obok skryptu.'
}
Add-Line ''

# --- autotest
Add-Line '--- autotest (ArcaneSpire.exe --selftest) ---'
if (Test-Path -LiteralPath $exe) {
    try {
        $proc = Start-Process -FilePath $exe -ArgumentList '--selftest' -PassThru -Wait -ErrorAction Stop
        Add-Line ("kod wyjścia: " + $proc.ExitCode)
    } catch {
        Add-Line ("nie udało się uruchomić: " + $_.Exception.Message)
    }
}
Add-Line 'Nazwa okna autotestu powinna się pojawić — jeśli się nie pojawiła, to jest właśnie problem.'
Add-Line ''

# --- logi launchera
Add-Line '--- logi ---'
$dataDir = Join-Path $env:LOCALAPPDATA 'ArcaneSpire'
Add-Line ("katalog danych: " + $dataDir + " (istnieje: " + (Test-Path -LiteralPath $dataDir) + ")")
foreach ($name in @('start.log', 'launcher.log')) {
    $path = Join-Path $dataDir $name
    Add-Line ("--- " + $path + " ---")
    if (Test-Path -LiteralPath $path) {
        Get-Content -LiteralPath $path -Tail 60 | ForEach-Object { Add-Line $_ }
    } else {
        Add-Line '(brak pliku — launcher prawdopodobnie nigdy nie wystartował)'
    }
    Add-Line ''
}

# --- dziennik zdarzeń
Add-Line '--- dziennik zdarzeń Windows (.NET Runtime / Application Error, 30 min) ---'
try {
    $since = (Get-Date).AddMinutes(-30)
    $events = Get-WinEvent -FilterHashtable @{ LogName = 'Application'; StartTime = $since } -ErrorAction Stop |
        Where-Object { $_.ProviderName -match 'Application Error|\.NET Runtime|Windows Error Reporting' } |
        Select-Object -First 12
    if ($events) {
        foreach ($event in $events) {
            Add-Line ("[" + $event.TimeCreated.ToString('HH:mm:ss') + "] " + $event.ProviderName)
            foreach ($row in ($event.Message -split "`n" | Select-Object -First 14)) { Add-Line ("    " + $row.Trim()) }
            Add-Line ''
        }
    } else {
        Add-Line '(brak błędów w dzienniku — system nie zarejestrował awarii aplikacji)'
    }
} catch {
    Add-Line ('nie udało się odczytać dziennika: ' + $_.Exception.Message)
}
Add-Line ''

Add-Line '===== koniec ====='

try {
    Set-Content -LiteralPath $outFile -Value $lines -Encoding UTF8
    Write-Host ''
    Write-Host ("Zapisano: " + $outFile) -ForegroundColor Green
    Start-Process notepad.exe -ArgumentList ('"' + $outFile + '"')
} catch {
    Write-Host ('Nie udało się zapisać raportu: ' + $_.Exception.Message) -ForegroundColor Red
}

Write-Host ''
Read-Host 'Nacisnij Enter, aby zamknac'
