const readline = require('readline');
const fs = require('fs');
const http = require('http');


const html =fs.readFileSync('./Templete/index.html','utf-8')
// Create a server
const server = http.createServer((request, response) => {
    console.log('A new request received');
    response.writeHead(200, {'Content-Type': 'text/html'}); // Change content type to 'text/html'
    response.end(html);
});

// Start the server
server.listen(8500, '127.0.0.1', () => {
    console.log('Server has started');
});
