const express = require("express");
const { getToken, getTweets } = require("./twitter.js");

const app = express();

const screen_names = ["TheOnion", "TelegraphNews", "CNBC"];

function formatData(tweetData) {
    return tweetData
        .filter((tw) => tw.entities.urls.length === 1)
        .map((tw) => {
            return {
                text: tw.full_text.split("http")[0].trim(),
                url: tw.entities.urls[0].url,
                account: tw.user.screen_name,
            };
        });
}

app.get("/tweets.json", (req, res) => {
    getToken()
        .then((token) => {
            //Find tweets from all sources
            Promise.all([
                getTweets(screen_names[0]),
                getTweets(screen_names[1]),
                getTweets(screen_names[2]),
            ])
                .then((tweetData) => {
                    //Combine and sort tweetData
                    const combinedTweetData = [
                        ...tweetData[0],
                        ...tweetData[1],
                        ...tweetData[2],
                    ];
                    const sortedTweetData = combinedTweetData.sort((a, b) => {
                        return new Date(b.created_at) - new Date(a.created_at);
                    });
                    //Filter and serve tweetData
                    res.json(formatData(sortedTweetData));
                })
                .catch((error) => {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                });
        })
        .catch((error) => {
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
