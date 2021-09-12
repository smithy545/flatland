import fs from "fs";
import http from "http";
import path from "path";

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
const port = 80;
server.listen(80);

console.log("Server started");
