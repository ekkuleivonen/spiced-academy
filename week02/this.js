/*
EXERCISE 1
Write a constructor called Rectangle that accepts two numbers (width and height) as parameters.
Rectangle instances should have a method called getArea that returns the instance's width multiplied by its height.
Write another constructor called Square that accepts one number (which will serve as both width and the height) as a parameter.
Instances of Square should also have a getArea method but you should not rewrite the getArea function you wrote for Rectangle.
Square instances should use the same getArea method that Rectangle instances do.
*/

//getArea function for both constructors
function getArea() {
    console.log(this.sideLenght1 * this.sideLenght2);
    return this.sideLenght1 * this.sideLenght2;
}

//constuctor for Rectangle
function Rectangle(width, height) {
    this.sideLenght1 = width;
    this.sideLenght2 = height;
}

Rectangle.prototype.getArea = getArea;

//constuctor for Square
function Square(sideLenght) {
    this.sideLenght1 = sideLenght;
    this.sideLenght2 = sideLenght;
}

Square.prototype.getArea = getArea;

var rect = new Rectangle(4, 5);
rect.getArea(); //20

var square = new Square(4);
square.getArea(); //16

/*
EXERCISE 2
Write a function called invertCase that expects a string as a parameter.
This function should return a new string with all the same characters as the string that was passed in but with the cases of the alphabetic characters switched.
Uppercase characters should become lowercase and lowercase letters should become uppercase.
Characters that are not alphabetic should not change. The toUpperCase and toLowerCase methods that all strings have will come in handy here. 
*/

function invertCase(str) {
    for (var i = 0; i < str.length; i++) {
        if (str[i] == str[i].toUpperCase()) {
            console.log(str[i].toLowerCase());
        } else if (str[i] == str[i].toLowerCase()) {
            console.log(str[i].toUpperCase());
        }
    }
}

invertCase("AbCdEfG");

//apply toUpperCase and toLowerCase to individual letters (you need to deconstruct thre string to an array?)
//srt can be read like an array (you can use for loops for srtings --> srt[1] gives you second letter)

/*
EXERCISE: BONUS
 
*/

//fix context issue with "this" keyword that occurs with the nested function
//build start method with prototype?
