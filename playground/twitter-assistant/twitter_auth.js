const { CLIENT_ID, CLIENT_SECRET } = require("./secrets.json");
const { TwitterApi } = require("twitter-api-v2");

const { writeFile } = require("fs"); //only here to emulate session storage

const client = new TwitterApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
});

const CALLBACK_URL = "http://www.localhost:3000/auth/twitter/callback";
const permissionScope = [
    "tweet.read",
    "users.read",
    "offline.access",
    "tweet.write",
];

module.exports.sendUserToAuth = () => {
    const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
        CALLBACK_URL,
        { scope: permissionScope }
    );
    const sessionInfo = {
        codeVerifier: codeVerifier,
        state: state,
    };
    writeFile("session.json", JSON.stringify(sessionInfo), "utf-8", (err) => {
        if (err)
            console.log("An error occured while writing JSON Object to File.");
    });

    return url;
};

module.exports.obtainAccessToken = async (
    code,
    codeVerifier,
    state,
    sessionState
) => {
    if (!codeVerifier || !state || !sessionState || !code) {
        throw "You denied the app or your session expired!";
    }
    if (state !== sessionState) {
        throw "Stored tokens didnt match!";
    }

    const currentClient = await client
        .loginWithOAuth2({ code, codeVerifier, redirectUri: CALLBACK_URL })
        .then(
            async ({
                client: loggedClient,
                accessToken,
                refreshToken,
                expiresIn,
            }) => {
                const clientObj = {
                    client: await loggedClient.v2.me(),
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    expiresIn: expiresIn,
                };
                return clientObj;
            }
        )
        .catch((err) => {
            if (err) throw "Invalid verifier or access tokens!";
        });
    return currentClient;
};

// Don't forget to specify 'offline.access' in scope list if you want to refresh your token later

// Redirect your user to {url}, store {state} and {codeVerifier} into a DB/Redis/memory after user redirection
