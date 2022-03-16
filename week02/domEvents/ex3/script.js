(function () {
    /*
Make a page that has on it an element that is 100px by 100px in size and has a solid black border.
When the user mouses down on this box, its background should change to a randomly selected color.
When the user mouses up on it, its background should change to another randomly selected color.
*/

    //get element "box" from document
    var box = document.getElementById("box");
    //listen to mouse hover on "box"
    box.addEventListener("mousedown", changeColor);
    box.addEventListener("mouseup", changeColor);

    //function to create random hex codes
    function getRandomColor() {
        var randomColor =
            "#" + Math.floor(Math.random() * 16777215).toString(16);
        console.log("this color is: ", randomColor);
        return randomColor;
    }
    //triggered by listeners
    function changeColor() {
        var thisColor = getRandomColor();
        box.style.backgroundColor = thisColor;
        box.style.boxShadow = "0px 0px 50px -10px" + thisColor;
    }
})();
