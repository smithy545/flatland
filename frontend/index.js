"use strict";
exports.__esModule = true;
var http = require("http");
var fs = require("fs");
var path = require("path");
var staticBasePath = '../shared';
var server = http.createServer(function (req, res) {
    var resolvedBase = path.resolve(staticBasePath);
    var safeSuffix = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');
    var fileLoc = path.join(resolvedBase, safeSuffix);
    fs.readFile(fileLoc, function (err, data) {
        if (err) {
            res.writeHead(404, "Not found");
            res.write("404: Could not find what you're looking for");
            return res.end();
        }
        res.statusCode = 200;
        res.write(data);
        return res.end();
    });
});
var port = process.env.PORT || 80;
server.listen(port);
console.log("Server started on port " + port);
