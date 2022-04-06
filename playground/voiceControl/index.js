const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", function (req, res) {
    res.sendFile(`${__dirname}/index.html`);
});
app.get("/script.js", function (req, res) {
    res.sendFile(`${__dirname}/script.js`);
});

//Whenever someone connects this gets executed
io.on("connection", (socket) => {
    console.log("A user connected");

    //Whenever someone disconnects this piece of code executed
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

http.listen(3000, function () {
    console.log("listening on *:3000");
});
