(function () {
    var fakeCursor = document.getElementById("fakeCursor"); //get fakeCursor
    document.addEventListener("mousemove", moveBox); //track mouse movement

    function moveBox(e) {
        var pointerX = e.clientX; // Get Mouse X
        var pointerY = e.clientY; // Get Mouse Y
        fakeCursor.style.left = pointerX + "px"; //set fakeCursor left to pointerX
        fakeCursor.style.top = pointerY + "px"; //set fakeCursor top to pointerY
        fakeCursor.style.transform = "translate(-50%, -50%)"; //fix translate to center fakeCursor
    }
})();
