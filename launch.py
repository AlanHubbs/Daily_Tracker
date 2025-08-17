#!/usr/bin/env python3
"""
Daily Tracker Launcher
Automatically starts a local web server and opens the app in your browser
"""

import http.server
import socketserver
import threading
import webbrowser
import time
import sys
import os

PORT = 8080
HOST = "localhost"

class QuietHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom HTTP request handler with less verbose logging"""
    def log_message(self, format, *args):
        # Only log errors, not every request
        if args[1] != '200':
            sys.stderr.write("%s - - [%s] %s\n" %
                         (self.client_address[0],
                          self.log_date_time_string(),
                          format%args))

def find_free_port(start_port=8080):
    """Find a free port starting from start_port"""
    port = start_port
    while port < start_port + 100:  # Try 100 ports
        try:
            with socketserver.TCPServer(("", port), None) as s:
                return port
        except OSError:
            port += 1
    return start_port

def start_server(port):
    """Start the HTTP server"""
    handler = QuietHTTPRequestHandler
    with socketserver.TCPServer(("", port), handler) as httpd:
        print(f"✅ Daily Tracker server running at http://{HOST}:{port}")
        print("📝 Press Ctrl+C to stop the server")
        print("-" * 50)
        httpd.serve_forever()

def main():
    print("-" * 50)
    print("🚀 Starting Daily Tracker...")
    print("-" * 50)
    
    # Find an available port
    port = find_free_port(PORT)
    
    # Start server in a separate thread
    server_thread = threading.Thread(target=start_server, args=(port,), daemon=True)
    server_thread.start()
    
    # Wait a moment for server to start
    time.sleep(1)
    
    # Open browser
    url = f"http://{HOST}:{port}"
    print(f"🌐 Opening browser at {url}")
    webbrowser.open(url)
    
    # Keep the script running
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n" + "-" * 50)
        print("👋 Shutting down Daily Tracker server...")
        print("-" * 50)
        sys.exit(0)

if __name__ == "__main__":
    # Change to script directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    main()