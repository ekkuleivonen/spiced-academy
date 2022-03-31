/*
Write a function that takes an array as an argument and returns a new array containing all of the items that are in the array that was passed in but in reverse order.
This function should:
- leave the original array unchanged
- contain no loops of any kind. That includes for, for...in, for...of, while, and do...while
- not call slice or any other method on the original array
- not call push or concat on any array in any way
 */
//EXEC1
const originalArr = [1, 2, 3];
function reverseArray(arr) {
    let reverseArr = [...arr].reverse();
    return reverseArr;
}
console.log("original array: ", originalArr);
console.log("reversed array: ", reverseArray(originalArr));

/*
Write a function that takes two arrays as arguments and returns a new array containing all of the items in the two arrays passed to it.
This function should:
- leave the original arrays unchanged
- contain no loops of any kind. That includes for, for...in, for...of, while, or do...while
- not call slice or any other method on the two arrays passed to it
- not call push or concat on any array in any way
*/
//EXEC2
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
function combineArrays(arr1, arr2) {
    const combArr = [...arr1, ...arr2];
    return combArr;
}
console.log("array 1: ", arr1);
console.log("array 2: ", arr2);
console.log("combined array: ", combineArrays(arr1, arr2));
/*
Rewrite the following function to use destructuring assignment for the three variables it creates.
The three cost declarations should be replaced with a single line (and you shouldn't change anything else).
*/
//EXEC3
function logInfo(city) {
    const { name, country, population: numPeople } = city;

    console.log(
        `${name} is in ${country} and has ${numPeople} inhabitants in it.`
    );
}

logInfo({ name: "Marseille", country: "France", population: 861635 }); //call function

/*
Pretend that it is 2002 and rewrite the following hipster Javascript so it will work in Internet Explorer 5 and Netscape 4.
*/
//EXEC4
let getNameAndCountry = ({ name, country }) => [name, country];

let getRelocatedCity = (city1, city2 = { country: "Germany" }) => {
    let [, country] = getNameAndCountry(city2);
    return {
        ...city1,
        country,
    };
};

function getNameAndCountry(obj) {
    var nameAndCountry = [obj.name, obj.country];
    return nameAndCountry;
}

function getRelocatedCity(city1, city2) {
    if (city2 == undefined) {
        city2.country = "Germany";
    }
}
