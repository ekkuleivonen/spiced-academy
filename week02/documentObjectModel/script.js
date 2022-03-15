/* EXERCISE 1
Write a function that expects a string representing a selector to be passed as a parameter.
The function should find all the elements in the document that match the selector and change their style so that the text they contain is italic, underlined, and bold.
*/

function stringEditor(cssElement) {
    var nodeList = document.querySelectorAll(cssElement);
    for (var i = 0; i < nodeList.length; i++) {
        nodeList[i].style.fontStyle = "italic";
        nodeList[i].style.textDecoration = "underline";
        nodeList[i].style.fontWeight = "bold";
    }
    return "Styling of elements complete";
}

/* EXERCISE 2
Write a function that expects a string representing a class name to be passed as a parameter.
The function should return an array containing all the elements in the document that have the class that was passed in.
*/

function arrayByClassName(className) {
    var htmlCollection = document.getElementsByClassName(className);
    var classNameArr = Array.prototype.slice.call(htmlCollection);
    console.log("classNameArr is an array= ", Array.isArray(classNameArr));
    return classNameArr;
}

/* EXERCISE 3
Write a function that inserts an element into the body of the currently loaded page.
That element should have fixed position, z-index of 2147483647, left of 20px, top of 100px, font-size of 200px, and contain the text 'AWESOME'.
*/

function addTextElement() {
    // 1. create new HTML element (chose tagname)
    var newTextItem = document.createElement("p");

    // 2. create some text that we want to put inside the element
    var elementContent = document.createTextNode("AWESOME");

    // 3. bring HTML element and text together
    newTextItem.appendChild(elementContent);

    // 4. add classes
    newTextItem.classList.add("added-text");

    // 5. Style newTextItem
    newTextItem.style.position = "fixed";
    newTextItem.style.left = "20px";
    newTextItem.style.top = "100px";
    newTextItem.style.fontSize = "200px";
    newTextItem.style.zIndex = "2147483647";

    // 6. make item visible by adding it to the document
    document.body.appendChild(newTextItem);
}
