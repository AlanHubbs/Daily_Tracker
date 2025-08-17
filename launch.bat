@echo off
REM Daily Tracker Launcher for Windows
REM Automatically starts a local server and opens the app

echo ==================================================
echo 🚀 Starting Daily Tracker...
echo ==================================================

REM Change to script directory
cd /d "%~dp0"

REM Check if Python 3 is installed
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Python found
    python launch.py
) else (
    py -3 --version >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✅ Python 3 found
        py -3 launch.py
    ) else (
        echo ❌ Python 3 is required but not found
        echo Please install Python 3 from: https://www.python.org/downloads/
        pause
        exit /b 1
    )
)