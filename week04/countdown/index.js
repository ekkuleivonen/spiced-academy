const Countdown = require("./countdown").Countdown;

const countdown = new Countdown(10);

countdown.on("secondElapsed", function (timeLeft) {
    if (timeLeft > 0) {
        console.log(timeLeft);
    } else {
        console.log("lift off!");
    }
});

/*
EXPECTED OUTPUT:
10
9
8
7
6
5
4
3
2
1
lift off!
*/
