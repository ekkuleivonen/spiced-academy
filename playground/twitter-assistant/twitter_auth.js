const { TwitterApi } = require("twitter-api-v2");
const { CLIENT_ID, CLIENT_SECRET } = require("./secrets.json");

const CALLBACK_URL = "http://www.localhost:3001/auth/twitter/callback";
const client = new TwitterApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
});

module.exports.generateTwitterLink = () => {
    const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
        CALLBACK_URL,
        { scope: ["tweet.read", "users.read", "offline.access"] }
    );
    return { url: url, codeVerifier: codeVerifier, state: state };
};

module.exports.getAccessToken = async (
    state,
    code,
    codeVerifier,
    sessionState
) => {
    if (!codeVerifier || !state || !sessionState || !code) {
        throw "User denied the app or session expired!";
    }
    if (state !== sessionState) {
        throw "Stored tokens didnt match!";
    }

    return client
        .loginWithOAuth2({ code, codeVerifier, redirectUri: CALLBACK_URL })
        .then(
            async ({
                client: loggedClient,
                accessToken,
                refreshToken,
                expiresIn,
            }) => {
                // {loggedClient} is an authenticated client in behalf of some user
                // Store {accessToken} somewhere, it will be valid until {expiresIn} is hit.
                // If you want to refresh your token later, store {refreshToken} (it is present if 'offline.access' has been given as scope)

                // Example request
                const { data: userObject } = await loggedClient.v2.me();
                console.log(userObject, accessToken);
                const clientSummary = {
                    twitter_username: userObject.username,
                    token: accessToken,
                    refreshToken: refreshToken,
                    expiresIn: expiresIn,
                };
                return clientSummary;
            }
        )
        .catch(() => {
            throw "Invalid verifier or access tokens!";
        });
};
