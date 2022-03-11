/*
EXERCISE 1

Write a function called each that accepts either an object or an array as its first parameter and a callback as its second parameter.
If the first parameter is an object, it should loop over the object's properties and call the callback for each one.
The property value should be the first parameter passed to the callback and the property name should be the second.

If the first parameter is an array, it should loop over the array's elements and call the callback for each one.

The array element should be the first parameter passed to the callback and the index should be the second.

You can test your function with the example below:

*/

function each(objOrArr, callback) {
    if (Array.isArray(objOrArr)) {
        for (var i = 0; i < objOrArr.length; i++) {
            callback(objOrArr[i], [i]);
        }
    } else if (typeof objOrArr === "object" && objOrArr !== null) {
        for (var key in objOrArr) {
            callback(objOrArr[key], key);
        }
    } else console.log("Wrong parameter for objOrArr!");
}

each(
    {
        a: 1,
        b: 2,
    },
    function (val, name) {
        console.log("The value of " + name + " is " + val);
    }
); // logs 'the value of a is 1' and 'the value of b is 2'

each(["a", "b"], function (val, idx) {
    console.log("The value of item " + idx + " is " + val);
}); // logs 'the value of item 0 is a' and 'the value of item 1 is b'

/*
EXERCISE 2

Write a function that takes an array as a parameter and returns a new array containing all of the items that are in the array that was passed in but in reverse order.
Unlike the reverse method that all arrays have, this function should leave the original array unchanged.
*/

var originalArray = [1, 2, 3, 4, 5, 6];
var reversedArray = reverse(originalArray);

function reverse(arr) {
    var copyOfOriginal = arr.slice();
    copyOfOriginal = copyOfOriginal.reverse();
    return copyOfOriginal;
}

console.log(originalArray); // [1, 2, 3, 4, 5, 6]
console.log(reversedArray); // [6, 5, 4, 3, 2, 1] //SCOPE ISSUE????

/*
EXERCISE 3

Write a function called getLessThanZero that expects an array of numbers to be passed to it and returns a new array containing only those numbers from the array that was passed in that are less than zero.
*/

function getLessThanZero(arr) {
    var filteredArray = arr.filter(function (number) {
        return number < 0;
    });
    return filteredArray;
}

console.log(getLessThanZero([1, 2, -1, -90, 10])); //[-1, -90]
console.log(getLessThanZero([1, 2])); //[]
