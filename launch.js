#!/usr/bin/env node

/**
 * Daily Tracker Launcher (Node.js version)
 * Automatically starts a local web server and opens the app
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8080;
const HOST = 'localhost';

// MIME types for different file extensions
const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Create server
const server = http.createServer((req, res) => {
    // Default to index.html for root path
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    // Get file extension for MIME type
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeType = MIME_TYPES[extname] || 'application/octet-stream';

    // Read and serve the file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('404 - File Not Found', 'utf-8');
            } else {
                // Server error
                res.writeHead(500);
                res.end('Sorry, server error: ' + error.code + ' ..\n');
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(content, 'utf-8');
        }
    });
});

// Find an available port
function findPort(startPort, callback) {
    const testServer = http.createServer();
    testServer.listen(startPort, () => {
        testServer.close(() => {
            callback(startPort);
        });
    }).on('error', () => {
        findPort(startPort + 1, callback);
    });
}

// Open browser
function openBrowser(url) {
    const platform = process.platform;
    let command;
    
    if (platform === 'darwin') {
        command = `open ${url}`;
    } else if (platform === 'win32') {
        command = `start ${url}`;
    } else {
        command = `xdg-open ${url}`;
    }
    
    exec(command, (error) => {
        if (error) {
            console.log(`Please open your browser and navigate to: ${url}`);
        }
    });
}

// Main function
function main() {
    console.log('--------------------------------------------------');
    console.log('🚀 Starting Daily Tracker...');
    console.log('--------------------------------------------------');
    
    findPort(PORT, (port) => {
        server.listen(port, HOST, () => {
            const url = `http://${HOST}:${port}`;
            console.log(`✅ Daily Tracker server running at ${url}`);
            console.log('📝 Press Ctrl+C to stop the server');
            console.log('--------------------------------------------------');
            
            // Open browser after a short delay
            setTimeout(() => {
                console.log(`🌐 Opening browser at ${url}`);
                openBrowser(url);
            }, 1000);
        });
    });
}

// Handle shutdown gracefully
process.on('SIGINT', () => {
    console.log('\n--------------------------------------------------');
    console.log('👋 Shutting down Daily Tracker server...');
    console.log('--------------------------------------------------');
    process.exit(0);
});

// Start the application
main();