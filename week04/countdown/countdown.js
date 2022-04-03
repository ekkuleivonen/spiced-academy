//enable events
const EventEmitter = require("events");

function Countdown(timeLeft) {
    this.timeLeft = timeLeft;
    this.start();
}

Countdown.prototype = new EventEmitter();

Countdown.prototype.start = function () {
    if (this.timeLeft >= 0) {
        setTimeout(() => {
            this.emit("secondElapsed", this.timeLeft);
            this.timeLeft--;
            this.start();
        }, 1000);
    }
};

module.exports.Countdown = Countdown;

//  should expect one parameter, a positive number indicating the number of seconds to count down
//  instances of Countdown should have events.EventEmitter.prototype in their prototype chain
//  When a countdown instance is created, it should emit a secondElapsed event every second until it gets to zero, passing the current number of seconds remaining to any listeners that have been added
//attach the countdown to export object
