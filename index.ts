const http = require("http");
const fs = require("fs");

const server = http.createServer(function(req, res) {
console.log("hit");
res.writeHead(200, {'Content-Type': 'text/html'});
fs.createReadStream('index.html').pipe(res);
}).listen(80);
console.log("Server started");