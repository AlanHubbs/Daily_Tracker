# 🚀 Daily Tracker Launch Guide

The Daily Tracker requires a local web server for full functionality (PWA features, service workers, etc.). We've created several easy ways to launch the app automatically.

## 🎯 Quick Start (Recommended)

### For Mac/Linux Users:
```bash
./launch.sh
```
Or double-click `launch.sh` in Finder

### For Windows Users:
Double-click `launch.bat`

### For Any System with Python:
```bash
python3 launch.py
```

## 📱 Desktop App Experience

1. **Mac Users**: 
   - Rename `DailyTracker.app.html` to `DailyTracker.app`
   - Double-click to open like a regular app
   - Add to Dock for quick access

2. **Windows Users**:
   - Create a shortcut to `launch.bat`
   - Pin to Start Menu or Taskbar

3. **Linux Users**:
   - Create a desktop entry for `launch.sh`
   - Add to favorites in your desktop environment

## 🛠️ Alternative Launch Methods

### Method 1: Python Launcher (Cross-platform)
```bash
python3 launch.py
```
**Features:**
- Auto-finds available port
- Opens browser automatically
- Clean console output
- Graceful shutdown with Ctrl+C

### Method 2: Node.js Launcher
```bash
node launch.js
```
**Requirements:** Node.js installed

### Method 3: Direct Python Server
```bash
python3 -m http.server 8080
```
Then open: http://localhost:8080

### Method 4: NPX (No Installation)
```bash
npx http-server
```
Then open: http://localhost:8080

## 🔧 Troubleshooting

### Port Already in Use?
The launchers automatically find an available port starting from 8080.

### Python Not Found?
- **Mac**: Python 3 is usually pre-installed
- **Windows**: Download from [python.org](https://www.python.org/downloads/)
- **Linux**: `sudo apt install python3` or equivalent

### Browser Doesn't Open?
The URL will be displayed in the terminal. Copy and paste it into your browser.

## 🌐 Permanent Solutions

### Deploy to GitHub Pages (Free)
1. Go to your GitHub repository
2. Settings → Pages
3. Select "Deploy from branch"
4. Choose "main" branch and "/" (root)
5. Save and wait ~5 minutes
6. Access at: `https://[your-username].github.io/Daily_Tracker/`

### Use a Local Development Server
Install a development server globally:
```bash
# Python
pip install --user livereload
livereload

# Node.js
npm install -g live-server
live-server

# Or use VS Code with Live Server extension
```

## 💡 Pro Tips

1. **Create an Alias** (Mac/Linux):
   Add to your `~/.bashrc` or `~/.zshrc`:
   ```bash
   alias tracker='cd ~/Documents/Daily_Tracker && python3 launch.py'
   ```
   Then just type `tracker` to launch!

2. **Create a Batch File** (Windows):
   Save this as `tracker.bat` somewhere in your PATH:
   ```batch
   @echo off
   cd /d "C:\path\to\Daily_Tracker"
   python launch.py
   ```

3. **Auto-start on Boot**:
   - Add the launcher to your system's startup applications
   - The server will run in the background

## ✅ Features That Require Server

When running via server, you get:
- ✅ Service Worker (offline support)
- ✅ PWA installation ("Add to Home Screen")
- ✅ Web App Manifest (app icons, splash screen)
- ✅ Better security model
- ✅ No CORS restrictions
- ✅ Full caching capabilities

## 📝 Notes

- The app data is stored in your browser's LocalStorage
- Data persists regardless of how you launch the app
- The server only serves files; no data is sent anywhere
- You can use different ports if 8080 is taken

---

**Enjoy your fully-featured Daily Tracker! 🎉**