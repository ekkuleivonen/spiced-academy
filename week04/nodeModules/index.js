// require node modules
const url = require("url"); //maybe decosntruct to make cooler
const qs = require("querystring");

logUrlInfo(process.argv[2]);
function logUrlInfo(urlString) {
    let parsedURL = url.parse(urlString);
    //log url info
    console.log("The protocol is ", parsedURL.protocol);
    console.log("The host is ", parsedURL.host);
    console.log("The hostname is ", parsedURL.hostname);
    console.log("The port is ", parsedURL.port);
    console.log("The pathname is ", parsedURL.pathname);
    console.log("The query is ", parsedURL.query);
    // separate query string
    let queryString = parsedURL.query;
    //if not null, log query values
    if (queryString != null) {
        let queryValues = qs.parse(queryString);
        //separate query values
        for (var key in queryValues) {
            console.log(
                "The value of the " + key + "parameter is " + queryValues[key]
            );
        }
    }
}

// test with the following commands in terminal
//node index.js "http://127.0.0.1:8080/test?a=100&b=200"
//node index.js "https://spiced.academy/program/full-stack-web-development/"
