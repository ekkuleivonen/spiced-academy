/*

*/
var x;
var doubleX;

x = 420;

function timesTwo(number) {
    return number * 2;
}

doubleX = timesTwo(x);

var numbers;
numbers = [x, doubleX];

for (var i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}

numbers = {};

numbers = {
    y: doubleX,
};
