(function () {
    //grab animazed element
    let ball = document.getElementById("ball");
    // Define canvas and context
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    // Define the points as {x, y}
    let start = { x: 10, y: 150 };
    let cp1 = { x: 100, y: 60 };
    let cp2 = { x: 250, y: 250 };
    let end = { x: 390, y: 150 };
    //keep track of mouse position
    var mouseX = 0;
    var mouseY = 0;
    //is pressed down
    var mouseIsDown = false;
    var isCp1 = false;
    var isCp2 = false;
    canvas.addEventListener("mousedown", startPosition);
    function startPosition(e) {
        mouseIsDown = true;
        if (
            mouseX > cp1.x - 20 &&
            mouseX < cp1.x + 20 &&
            mouseY > cp1.y - 20 &&
            mouseY < cp1.y + 20
        ) {
            isCp1 = true;
            isCp2 = false;
        } else if (
            mouseX > cp2.x - 20 &&
            mouseX < cp2.x + 20 &&
            mouseY > cp2.y - 20 &&
            mouseY < cp2.y + 20
        ) {
            isCp2 = true;
            isCp1 = false;
        }

        changeCoordinates(e);
    }
    //is lifted
    canvas.addEventListener("mouseup", finishedPosition);
    function finishedPosition() {
        mouseIsDown = false;
        isCp1 = false;
        isCp2 = false;
    }
    //mousemove chnages coordinates for controlpoints 1 and 2
    canvas.onmousemove = changeCoordinates;
    function changeCoordinates(e) {
        mouseX = e.pageX - this.offsetLeft;
        mouseY = e.pageY - this.offsetTop;
        if (isCp1 && !isCp2) {
            cp1.x = mouseX; // regarding cp1
            cp1.y = mouseY; // regarding cp1
        } else if (isCp2 && !isCp1) {
            cp2.x = mouseX; // regarding cp2
            cp2.y = mouseY; // regarding cp2
        }
        if (!mouseIsDown) return;
        move(); // triggers the move function for the respective CP
        adoptBezier(); //triggers the adoption function with correct data
    }
    // animated element "ball" adopts its animation bezier curve to control point coordinates
    function adoptBezier() {
        var x1 = cp1.x / canvasWidth;
        var y1 = cp1.y / canvasHeight;
        var x2 = cp2.x / canvasWidth;
        var y2 = cp2.y / canvasHeight;
        ball.style.animationTimingFunction =
            "cubic-bezier(" + x1 + "," + y1 + "," + x2 + "," + y2 + ")";
    }

    function move() {
        //clear canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        //draw helper lines
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(cp1.x, cp1.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(end.x, end.y);
        ctx.lineTo(cp2.x, cp2.y);
        ctx.stroke();

        // Cubic Bézier curve
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
        ctx.stroke();

        // Start and end points
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(start.x, start.y, 10, 0, 2 * Math.PI); // Start point
        ctx.arc(end.x, end.y, 10, 0, 2 * Math.PI); // End point
        ctx.fill();

        // Control points
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(cp1.x, cp1.y, 10, 0, 2 * Math.PI); // Control point one
        ctx.arc(cp2.x, cp2.y, 10, 0, 2 * Math.PI); // Control point two
        ctx.fill();
    }

    //draw helper lines
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(cp1.x, cp1.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(end.x, end.y);
    ctx.lineTo(cp2.x, cp2.y);
    ctx.stroke();

    // Cubic Bézier curve
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    ctx.stroke();

    // Start and end points
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(start.x, start.y, 10, 0, 2 * Math.PI); // Start point
    ctx.arc(end.x, end.y, 10, 0, 2 * Math.PI); // End point
    ctx.fill();

    // Control points
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(cp1.x, cp1.y, 10, 0, 2 * Math.PI); // Control point one
    ctx.arc(cp2.x, cp2.y, 10, 0, 2 * Math.PI); // Control point two
    ctx.fill();
})();
