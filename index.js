var http = require('http');
var fs = require('fs');
var path = require('path');
http.createServer(function (req, res) {
    console.log("Request hit");
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end("Test response", 'utf-8');
}).listen(80);
console.log("Server started");
