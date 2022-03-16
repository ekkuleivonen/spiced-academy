(function () {
    /* Make a page that has on it an element that is 200px by 200px in size and has a solid background color.
Nest within that element another element that is 50px by 50px in size and has a different solid background color.
When the user clicks on the outer element its background color should change to a randomly selected color.
However, if the user clicks on the inner element, the inner element's background color should change to a randomly selected background color but the outer element's background color should not change at all.*/

    //Store both elements in varables
    var outer = document.getElementById("outer");
    var inner = document.getElementById("inner");
    //set eventlisteners for both elements
    outer.addEventListener("mousedown", changeColor);
    inner.addEventListener("mousedown", changeColor);

    //function to create random hex codes
    function getRandomColor() {
        var randomColor =
            "#" + Math.floor(Math.random() * 16777215).toString(16);
        console.log("this color is ", randomColor);
        return randomColor;
    }

    //triggered by listeners
    function changeColor(e) {
        e.stopPropagation();
        var thisColor = getRandomColor();
        e.target.style.backgroundColor = thisColor;
    }
})();
