const getTweets = require("./twitter.js");
const express = require("express");
const app = express();
//const sampleTweets = require("./tweets_sample.json");

const screen_name = "TheOnion";

function formatData(tweetData) {
    return tweetData
        .filter((tw) => tw.entities.urls.length === 1)
        .map((tw) => {
            return {
                text: tw.full_text.split("http")[0].trim(),
                url: tw.entities.urls[0].url,
            };
        });
}

app.get("/tweets.json", (req, res) => {
    getTweets(screen_name)
        .then(function (tweetData) {
            res.json(formatData(tweetData));
        })
        .catch(function (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        });
});

app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(3000);
