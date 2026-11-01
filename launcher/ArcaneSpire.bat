@echo off
rem ===================================================================
rem  ARCANE SPIRE - launcher (Windows 10/11, nic nie trzeba instalowac)
rem  Uruchamia ArcaneSpire.ps1 w ukrytym oknie PowerShell.
rem  Opcjonalne przelaczniki:  ArcaneSpire.bat -SelfTest
rem ===================================================================
setlocal
chcp 65001 >nul 2>nul
set "HERE=%~dp0"
set "APPINSTALL=%LOCALAPPDATA%\ArcaneSpire\app\ArcaneSpire.ps1"

set "TARGET=%HERE%ArcaneSpire.ps1"
if exist "%APPINSTALL%" set "TARGET=%APPINSTALL%"

if not exist "%TARGET%" (
  echo Nie znaleziono ArcaneSpire.ps1 obok tego pliku.
  echo Pobierz launcher ponownie z GitHuba.
  pause
  exit /b 1
)

set "PSEXE=powershell.exe"
where pwsh.exe >nul 2>nul && set "PSEXE=pwsh.exe"

start "" "%PSEXE%" -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%TARGET%" %*
exit /b 0
