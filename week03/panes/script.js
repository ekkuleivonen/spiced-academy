/*
Check if user has mousedown on slider. If yes --> make slider and clip path follow mouse movementX over image container
*/

//Store variables
var container = $(".container");
var afterImg = $(".container .after");
var slider = $(".container .slider");
var mouseDown = false;
//Event listeners

////mousedown on slider --> set mousedown=true
slider.on("mousedown", function () {
    mouseDown = true;
    beforeAfter();
    //console.log("mouse downed", mouseDown);
    return mouseDown;
});
//function
function beforeAfter() {
    container.on("mousemove", function (e) {
        //check if mouse id pressed on slider
        if (mouseDown === true) {
            var xPosition = e.clientX - container.offset().left;
            afterImg.css({
                clipPath: "inset(0 0 0 " + xPosition + "px)",
            });
            slider.css({
                left: xPosition,
            });
        }
    });
    ////mouseup on document --> set mousedown=false
    document.addEventListener("mouseup", function () {
        mouseDown = false;
        //console.log("mouse lifted", mouseDown);
        return mouseDown;
    });
}
