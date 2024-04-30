const readline = require('readline');
const fs = require('fs');
const http = require('http');

// Create a server
const server = http.createServer((request, response) => {
    console.log('A new request received');
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('<h1>this my new home page</h1>');
});

// Start the server
server.listen(8500, '127.0.0.1', () => {
    console.log('Server has started');
});  
