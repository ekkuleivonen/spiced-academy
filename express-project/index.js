const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const basicAuth = require("basic-auth");

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//SERVE COOKIES PAGE
app.get("/cookies.html", (req, res) => {
    res.sendFile(path.join(__dirname, "cookies.html"));
});

//POST COOKIE CONSENT
app.post("/cookies.html", (req, res) => {
    if (req.body.consent == "true") {
        res.cookie("consent", "true");
    }
    res.redirect(req.cookies.reqURL);
});

//DEFINE COOKIE ACCESS TO PAGES
app.use((req, res, next) => {
    if (req.cookies.consent != "true" && !req.url.includes("cookies.html")) {
        //Store previous URL in a cookie
        res.cookie("reqURL", req.url);
        res.redirect("/cookies.html");
    } else next();
});
//SERVE INDEX.HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

//REQUIRE PASSWORD FOR SPOTIFY SEARCH
//DEFINE BASIC AUTH
const auth = function (req, res, next) {
    const creds = basicAuth(req);
    if (!req.url.includes("SpotifySearch")) return next();
    if (!creds || creds.name != "testuser" || creds.pass != "testpassword") {
        console.log("SHOW ME YOURSELF");
        res.setHeader(
            "WWW-Authenticate",
            'Basic realm="Enter your credentials to see this stuff."'
        );
        res.sendStatus(401);
    } else {
        next();
    }
};
app.use(auth);

//SERVE PROJECTS
app.use(express.static(path.join(__dirname, "projects")));

app.listen(3000, () => console.log("listening on port 3000..."));
