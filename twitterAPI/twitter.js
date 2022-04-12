const https = require("https");
const { TWITTER_KEY, TWITTER_SECRET } = require("./secrets.json");

function makeRequest({ method, host, path, headers, body }, callback) {
    const request = https.request(
        {
            method,
            host,
            path,
            headers,
        },
        (response) => {
            let body = "";
            response.on("data", (chunk) => {
                body += chunk;
            });
            response.on("end", () => {
                try {
                    const parsedBody = JSON.parse(body);
                    callback(null, parsedBody);
                } catch (error) {
                    callback(error);
                }
            });
        }
    );

    request.on("error", (error) => {
        callback(error);
    });

    request.end(body);
}

function getToken(callback) {
    const authString = Buffer.from(`${TWITTER_KEY}:${TWITTER_SECRET}`).toString(
        "base64"
    );
    makeRequest(
        {
            method: "POST",
            host: "api.twitter.com",
            path: "/oauth2/token",
            headers: {
                Authorization: `Basic ${authString}`,
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },

            body: "grant_type=client_credentials",
        },

        (error, data) => {
            if (error) {
                console.log("error/callback", error);
                callback(error);
            }
            //console.log(data);
            callback(null, data);
        }
    );
}

function getTweets(screen_name, callback) {
    getToken((error, token) => {
        if (error) {
            console.log("error retrieving token", error);
            return;
        }
        console.log("about to use this token for requesting tweets: ", token);
        makeRequest(
            {
                method: "GET",
                host: "api.twitter.com",
                path: `/1.1/statuses/user_timeline.json?screen_name=${screen_name}&tweet_mode=extended&exclude_replies=true`,
                headers: {
                    Authorization: `${token.token_type} ${token.access_token}`,
                },
            },
            (error, data) => {
                if (error) {
                    console.log("Error making tweets get request", error);
                }
                callback(null, data);
            }
        );
    });
}

//getTweets("TheOnion", (error, tweets) => {
//    if (error) {
//        console.log("error retrieving tweets", error);
//        return;
//    }
//    console.log("tweets", tweets);
//});

module.exports = getTweets;
