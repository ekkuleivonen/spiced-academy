/*
EXERCISE 1

Write a function that takes any number of numbers as arguments and returns the sum of those numbers.

*/

function sum() {
    var total = 0;
    for (var i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    console.log(total);
    return total;
}

sum(10, 5);

/*
EXERCISE 2

Write a function named waitThenRun that takes another function as an argument.
It should wait 1.5 seconds and then run the function that was passed in.

*/

function waitThenRun(fn) {
    setTimeout(fn, 1500);
}

waitThenRun(function () {
    console.log("Hello!");
    waitThenRun(function () {
        console.log("Goodbye!");
    });
});

/*
EXERCISE 3

Write a function that expects a number as an argument.
If the value that is passed in is less than 0, equal to 0, or not a number, the function should return the string 'ERROR'.
If the number that is passed in is greater than or equal to 1000000 it should simply return the number.
Otherwise it should multiply the number by 10 however many times it takes to get a number that is greater than or equal to 1000000 and return that.

*/

function onlyHugeNumbers(num) {
    if (num <= 0 || Number.isNaN(num)) {
        return "ERROR";
    } else if (num >= 1000000) {
        return num;
    } else {
        while (num < 1000000) {
            num *= 10;
        }
        return num;
    }
}

console.log(onlyHugeNumbers(-1));
console.log(onlyHugeNumbers(NaN));
console.log(onlyHugeNumbers(1000500));
console.log(onlyHugeNumbers(25));
/*
BONUS EXERCISE

Write a function that returns a function that can be called repeatedly and passed a number each time.
Each time it is called it should return the sum of the number that is passed in and all other numbers that were passed in previous calls.
That is, it should return the sum of all the numbers that were ever passed to it.

*/

function getTotaler() {
    var count = 0;
    return function (input) {
        count += input;
        console.log(count);
        return count;
    };
}

var totaler = getTotaler();
totaler(1); //1
totaler(2); //3
totaler(5); //8
totaler(8); //16
