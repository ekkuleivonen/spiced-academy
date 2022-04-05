const http = require("http");
const chalk = require("chalk");
const querystring = require("querystring");
const htmlBody = `<!doctype html>
<html>
<title>Colors</title>
<form method="POST">
  <input type="text" name="text" placeholder="please enter some text" autocomplete="off">
  <select name="color">
    <option value="red">red</option>
    <option value="blue">blue</option>
    <option value="green">green</option>
    <option value="yellow">yellow</option>
    <option value="gray">gray</option>
    <option value="magenta">magenta</option>
    <option value="cyan">cyan</option>
  </select>
  <button type="submit">Go</button>
</form>
</html>`;

const server = http.createServer((req, res) => {
    req.on("error", (err) => console.log("req err", err));
    res.on("error", (err) => console.log("res err", err));

    //grab body
    function sendRequestBody() {
        var parsedBody;
        let body = "";
        req.on("data", function (chunk) {
            body += chunk;
        }).on("end", function () {
            parsedBody = querystring.parse(body);
            res.setHeader("content-type", "text/html");
            res.statusCode = 200;
            res.write(
                `<a href="/" style="color:${parsedBody.color}">${parsedBody.text}</a> `
            );
            console.log(chalk[parsedBody.color](parsedBody.text));
            res.end();
        });
    }

    //construct responses
    if (req.method === "GET") {
        res.write(htmlBody);
        res.end();
    } else if (req.method === "POST") {
        sendRequestBody();
    }
});

server.listen(3000, () => console.log("listening on port 3000"));
