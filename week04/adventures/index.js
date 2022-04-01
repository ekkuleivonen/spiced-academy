const chalk = require("chalk");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const story = {
    // you can make a better story than this one
    q: "Welcome to The Land Of Wizards! Would you like to play?",
    answers: {
        yes: {
            q: "You are alone in a dark forest and facing a fork in the road. Which direction do you turn?",
            answers: {
                left: {
                    q: "There's a scary wizard! He asks you a tough question. What's 1+1?",
                    answers: {
                        2: "Congratulations!",
                    },
                },
                right: "This was not the right choice. Goodbye!",
            },
        },
        no: "Alright then. Enjoy your day!",
    },
};

ask(story);

function ask(obj) {
    rl.question(chalk.gray.bold(obj.q), function (answer) {
        if (!obj.answers[answer]) {
            console.log(chalk.italic.redBright.bold("Please try again!"));
            ask(obj);
        } else if (typeof obj.answers[answer] === "object") {
            ask(obj.answers[answer]);
        } else {
            console.log(chalk.greenBright.bold(obj.answers[answer]));
            rl.close();
        }
    });
}
