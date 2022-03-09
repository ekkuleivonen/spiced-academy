/*
EXERCISE 1

Write a function named logType that expects a single argument and logs a different string depending
on the type/value of the argument that is passed to it. The string it logs should be one of the following:
"undefined!", "null!", "number!", "not a number!", "string!", "boolean!", "bigint!", "function!", "object!", "array!", "I have no idea!"

*/

function logType(arg) {
    var type = arg;
    if (Array.isArray(type)) {
        console.log("array!");
    } else if (type === null) {
        console.log("null!");
    } else if (Number.isNaN(type)) {
        console.log("not a number!");
    } else if (typeof type == "undefined") {
        console.log("undefined!");
    } else if (typeof type == "number") {
        console.log("number!");
    } else if (typeof type == "string") {
        console.log("string!");
    } else if (typeof type == "boolean") {
        console.log("boolean!");
    } else if (typeof type == "bigint") {
        console.log("bigint!");
    } else if (typeof type == "function") {
        console.log("function!");
    } else if (typeof type == "object") {
        console.log("object");
    } else console.log("I have no idea!");
}
//PUT NULL AND ARRAY checks First
// Your code to check for the argument's type/value goes here.
// Bear in mind the special cases we talked about in the encounter. 🤔
// The order of your if conditions might be important. 💡

// Test cases. Make all of them log the expected string.
logType(undefined);
logType(null);
logType(237);
logType(NaN);
logType("Hi");
logType(true);
logType(2n);
logType(function () {});
logType({});
logType([]);
logType(Symbol());

/*
EXERCISE 2

a) copy the following object into your code:

var a = {
   Berlin: 'Germany',
   Paris: 'France',
   'New York': 'USA'
};

b) Then create a new empty object b and use a for..in loop to iterate over all of a's properties.
Give b properties whose names are the values from a and whose values are the property names from a.
The result should be an object that looks like this:

{
   Germany: 'Berlin',
   France: 'Paris',
   USA: 'New York' 
}

*/

var a = {
    Berlin: "Germany",
    Paris: "France",
    "New York": "USA",
};

var b = {};
for (var key in a) {
    b[a[key]] = key;
}

console.log(b);

/*
EXERCISE 3

Write a while or for loop that counts down from 10 to 1, logging each number to the console.

*/

for (var i = 10; i > 0; i--) {
    console.log(i);
}
