import http = require("http");
import fs = require("fs");
import path = require("path");

const staticBasePath = '../shared';

const server = http.createServer(function (req, res) {
    const resolvedBase = path.resolve(staticBasePath);
    const safeSuffix = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');
    const fileLoc = path.join(resolvedBase, safeSuffix);

    fs.readFile(fileLoc, function(err, data) {
        if(err) {
            res.writeHead(404, "Not found");
            res.write("404: Could not find what you're looking for");
            return res.end();
        }

        res.statusCode = 200;
        res.write(data);
        return res.end();
    })
});
const port = process.env.PORT || 80;
server.listen(port);

console.log("Server started on port " + port);
