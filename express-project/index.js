const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

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

//DEFINE ACCESS TO PAGES
app.use((req, res, next) => {
    if (req.cookies.consent != "true" && !req.url.includes("cookies.html")) {
        //Store previous URL in a cookie
        res.cookie("reqURL", req.url);
        res.redirect("/cookies.html");
    } else next();
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.use(express.static(path.join(__dirname, "projects")));

app.listen(3000, () => console.log("listening on port 3000..."));
