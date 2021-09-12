var http = require("http");
var fs = require("fs");
var server = http.createServer(function (req, res) {
    console.log("hit");
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream('../shared/index.html').pipe(res);
}).listen(80);
console.log("Server started");
