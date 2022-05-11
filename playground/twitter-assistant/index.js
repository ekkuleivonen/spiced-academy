const express = require("express");
const { SESSION_SIGNATURE } = require("./secrets.json");
const cookieSession = require("cookie-session");
const { generateTwitterLink, getAccessToken } = require("./twitter_auth");

const port = 3001;
const app = express();

//MIDDLEWARE
app.use(express.static("public"));
app.use(
    cookieSession({
        secret: SESSION_SIGNATURE,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);
/////////////////////////////////////////////

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/home.html`);
});

app.get("/auth/twitter", (req, res) => {
    const { url, codeVerifier, state } = generateTwitterLink();
    req.session.codeVerifier = codeVerifier;
    req.session.state = state;
    res.redirect(url);
});

app.get("/auth/twitter/callback", async (req, res) => {
    const { state, code } = req.query;
    const { codeVerifier, state: sessionState } = req.session;

    const loggedClient = await getAccessToken(
        state,
        code,
        codeVerifier,
        sessionState
    );
    console.log("final client", loggedClient);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
