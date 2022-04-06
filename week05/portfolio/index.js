const http = require("http");
const fs = require("fs");
const path = require("path");

http.createServer((req, res) => {
    if (req.method != "GET") {
        res.statusCode = 405;
        res.end();
    }

    let filePath = path.join(__dirname, "projects", req.url);
    console.log("Filepath inserted to browser: ", filePath);

    if (!filePath.startsWith(path.join(__dirname, "projects"))) {
        console.log("Naughty URL!");
        res.statusCode = 403;
        return res.end();
    }

    let extName = path.extname(filePath);
    let contentType = getContentType(extName);

    function getContentType(extName) {
        if (extName == ".html") return "text/html";
        if (extName == ".css") return "text/css";
        if (extName == ".js") return "text/javascript";
        if (extName == ".json") return "application/json";
        if (extName == ".gif") return "image/gif";
        if (extName == ".jpg") return "image/jpeg";
        if (extName == ".jpeg") return "image/jpeg";
        if (extName == ".png") return "image/png";
        if (extName == ".svg") return "image/svg+xml";
    }

    fs.stat(filePath, function (err, stats) {
        if (err) {
            console.log(err);
            res.statusCode = 404;
            return res.end();
        } else {
            if (stats.isDirectory()) {
                if (!req.url.endsWith("/")) {
                    console.log("SLASH was added");
                    res.statusCode = 302;
                    res.setHeader("location", `${req.url}/`);
                    res.end();
                } else {
                    filePath = path.join(
                        __dirname,
                        "projects",
                        req.url,
                        "index.html"
                    );
                    const readStream = fs.createReadStream(filePath);
                    console.log("FILEPATH IN RD1: ", filePath);
                    readStream.on("error", (err) => {
                        console.log(err, "no index.html in the folder");
                        res.statusCode = 404;
                        res.end();
                    });
                    res.statusCode = 200;
                    res.setHeader("content-type", "text/html");
                    readStream.pipe(res);
                }
            } else {
                const readStream = fs.createReadStream(filePath);
                console.log("FILEPATH IN RD2: ", filePath);
                readStream.on("error", (err) => {
                    console.log(err, "no index.html in the folder");
                    res.statusCode = 404;
                    res.end();
                });
                res.statusCode = 200;
                res.setHeader("content-type", contentType);
                readStream.pipe(res);
            }
        }
    });
}).listen(8080, () => console.log(`I'm listening.`));
