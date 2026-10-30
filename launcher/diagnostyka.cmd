@echo off
rem Diagnostyka launchera Arcane Spire - zbiera logi i uruchamia autotest.
chcp 65001 >nul 2>nul
setlocal
set "HERE=%~dp0"
set "PS1=%HERE%diagnostyka.ps1"
if not exist "%PS1%" (
  echo Nie znaleziono diagnostyka.ps1 obok tego pliku.
  pause
  exit /b 1
)
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%PS1%"
exit /b 0
