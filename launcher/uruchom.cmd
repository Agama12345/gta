@echo off
rem Uruchamia Arcane Spire z pelnym logowaniem startu.
rem Jesli okno sie nie pojawi w 20 sekund, ten skrypt pokaze, co sie stalo.
chcp 65001 >nul 2>nul
setlocal
set "HERE=%~dp0"

set "EXE=%HERE%ArcaneSpire.exe"
if not exist "%EXE%" (
  echo Nie znaleziono ArcaneSpire.exe obok tego pliku.
  pause
  exit /b 1
)

set "LOGDIR=%LOCALAPPDATA%\ArcaneSpire"
if not exist "%LOGDIR%" mkdir "%LOGDIR%" >nul 2>nul
if exist "%LOGDIR%\start.log" del /q "%LOGDIR%\start.log" >nul 2>nul

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "Unblock-File -LiteralPath '%EXE%'" >nul 2>nul

echo Uruchamiam Arcane Spire...
start "" "%EXE%"

echo Czekam 20 sekund na okno launchera...
timeout /t 20 /nobreak >nul

tasklist /fi "imagename eq ArcaneSpire.exe" | find /i "ArcaneSpire.exe" >nul
if errorlevel 1 (
  echo.
  echo ================================================================
  echo  Launcher nie dziala - proces zakonczyl sie od razu.
  echo ================================================================
  echo.
  echo Ostatnie kroki startu:
  echo ----------------------------------------------------------------
  if exist "%LOGDIR%\start.log" (
    powershell.exe -NoProfile -Command "Get-Content -LiteralPath '%LOGDIR%\start.log' -Tail 30"
  ) else (
    echo  Brak pliku start.log - plik exe w ogole sie nie uruchomil.
    echo  To zwykle oznacza: blokade SmartScreen/antywirus albo brak .NET Framework 4.8.
  )
  echo ----------------------------------------------------------------
  echo.
  echo Uruchom teraz diagnostyka.cmd i wyslij plik diagnostyka.txt z pulpitu.
  echo.
  pause
  exit /b 1
)

echo Okno launchera dziala.
exit /b 0
