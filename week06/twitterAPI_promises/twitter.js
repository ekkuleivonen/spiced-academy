const https = require("https");
const { TWITTER_KEY, TWITTER_SECRET } = require("./secrets.json");

function makeRequest({ method, host, path, headers, body }) {
    return new Promise(function (resolve, reject) {
        const request = https.request(
            { method, host, path, headers },
            (response) => {
                let body = "";
                response.on("data", (chunk) => {
                    body += chunk;
                });
                response.on("end", () => {
                    try {
                        const parsedBody = JSON.parse(body);
                        resolve(parsedBody);
                    } catch (error) {
                        // reject
                        reject(error);
                    }
                });
            }
        );
        request.on("error", (error) => {
            reject(error);
        });
        request.end(body);
    });
}

function getToken() {
    return new Promise(function (resolve, reject) {
        const authString = Buffer.from(
            `${TWITTER_KEY}:${TWITTER_SECRET}`
        ).toString("base64");

        makeRequest({
            method: "POST",
            host: "api.twitter.com",
            path: "/oauth2/token",
            headers: {
                Authorization: `Basic ${authString}`,
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },

            body: "grant_type=client_credentials",
        })
            .then(function (token) {
                resolve(token);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function getTweets(screen_names) {
    return new Promise(function (resolve, reject) {
        getToken().then(function (foundToken) {
            //give foundToken to the tweet request below
            //console.log("LOOK AT MY TOKEN", foundToken);
            makeRequest({
                method: "GET",
                host: "api.twitter.com",
                path: `/1.1/statuses/user_timeline.json?screen_name=${screen_names}&tweet_mode=extended&exclude_replies=true`,
                headers: {
                    Authorization: `${foundToken.token_type} ${foundToken.access_token}`,
                },
            })
                .then(function (tweetData) {
                    resolve(tweetData);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    });
}

//getTweets("TheOnion")
//    .then(function (tweetData) {
//        console.log(tweetData);
//    })
//    .catch(function (error) {
//        console.log(error);
//    });

module.exports = {
    getTweets,
    getToken,
};
