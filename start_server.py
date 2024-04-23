import socketserver

import http.server
import os

# Set the port number you want to use
port = 8000

# Set the directory where your sudoku.html file is located
directory = "C:/Users/Miki/OneDrive - CVUT/JS/SmartSudoku"

# Create a simple HTTP server
handler = http.server.SimpleHTTPRequestHandler

# Change the current working directory to the specified directory
# This is required to serve the sudoku.html file
os.chdir(directory)

# Start the server
with socketserver.TCPServer(("", port), handler) as httpd:
    print(f"Server started on port {port}")
    httpd.serve_forever()