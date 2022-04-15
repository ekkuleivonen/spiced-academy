const express = require("express");
const { sendUserToAuth, obtainAccessToken } = require("./twitter_auth.js");
const port = 3000;

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/home.html`);
});

app.get("/auth/twitter", (req, res) => {
    res.redirect(sendUserToAuth());
});

app.get("/auth/twitter/callback", async (req, res) => {
    const { state, code } = req.query;
    const { codeVerifier, state: sessionState } = require("./session.json");

    const currentTokenInfo = await obtainAccessToken(
        code,
        codeVerifier,
        state,
        sessionState
    );

    console.log(currentTokenInfo);
    res.send(`Welcome, ${currentTokenInfo.client.data.name}`);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
