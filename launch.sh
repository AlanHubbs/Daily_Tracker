#!/bin/bash

# Daily Tracker Launcher for Mac/Linux
# Automatically starts a local server and opens the app

echo "=================================================="
echo "🚀 Starting Daily Tracker..."
echo "=================================================="

# Change to script directory
cd "$(dirname "$0")"

# Check if Python 3 is installed
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 found"
    python3 launch.py
elif command -v python &> /dev/null; then
    # Check if 'python' is Python 3
    if python --version 2>&1 | grep -q "Python 3"; then
        echo "✅ Python 3 found"
        python launch.py
    else
        echo "❌ Python 3 is required but not found"
        echo "Please install Python 3: https://www.python.org/downloads/"
        exit 1
    fi
else
    echo "❌ Python is not installed"
    echo "Please install Python 3: https://www.python.org/downloads/"
    exit 1
fi