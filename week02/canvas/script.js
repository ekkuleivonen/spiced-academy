(function () {
    //save rendering context of smallCanvas in a variable
    var ctxSmallCanvas = document
        .getElementById("smallCanvas")
        .getContext("2d");
    // log brush color
    console.log("this is your stroke color: ", ctxSmallCanvas.strokeStyle);
    //draw head
    ctxSmallCanvas.beginPath();
    ctxSmallCanvas.arc(150, 100, 50, 0, 2 * Math.PI);
    ctxSmallCanvas.stroke();
    //draw torso
    ctxSmallCanvas.beginPath();
    ctxSmallCanvas.moveTo(150, 150);
    ctxSmallCanvas.lineTo(150, 350);
    ctxSmallCanvas.stroke();
    //draw hands
    ctxSmallCanvas.beginPath();
    ctxSmallCanvas.moveTo(150, 200);
    ctxSmallCanvas.lineTo(50, 150);
    ctxSmallCanvas.moveTo(150, 200);
    ctxSmallCanvas.lineTo(250, 150);
    ctxSmallCanvas.stroke();
    //draw legs
    ctxSmallCanvas.beginPath();
    ctxSmallCanvas.moveTo(150, 350);
    ctxSmallCanvas.lineTo(50, 450);
    ctxSmallCanvas.moveTo(150, 350);
    ctxSmallCanvas.lineTo(250, 450);
    ctxSmallCanvas.stroke();

    //store the drawn smallCanvas in a variable
    var originalStickFigure = document.getElementById("smallCanvas");

    //save rendering context of bigCanvas in a variable
    var ctxBigCanvas = document.getElementById("bigCanvas").getContext("2d");
    //set variable for stick figure posX and posY on big canvas
    var positionX = 0;
    var positionY = 0;
    //draw smallCanvas on bigCanvas using the position varibales
    ctxBigCanvas.drawImage(originalStickFigure, positionX, positionY);
    // listen for keydown
    document.addEventListener("keydown", reDraw);
    //use arrow direction to reDraw the smallCanvas in a new location
    function reDraw(e) {
        if (e.keyCode == 37) {
            console.log("LEFT");
            ctxBigCanvas.clearRect(0, 0, 600, 700); //clear canvas
            positionX -= 5; //adjust positionX
            ctxBigCanvas.drawImage(originalStickFigure, positionX, positionY); //redraw
        } else if (e.keyCode == 38) {
            console.log("UP");
            ctxBigCanvas.clearRect(0, 0, 600, 700); //clear canvas
            positionY -= 5; //adjust positionY
            ctxBigCanvas.drawImage(originalStickFigure, positionX, positionY); //redraw
        } else if (e.keyCode == 39) {
            console.log("RIGHT");
            ctxBigCanvas.clearRect(0, 0, 600, 700); //clear canvas
            positionX += 5; //adjust positionX
            ctxBigCanvas.drawImage(originalStickFigure, positionX, positionY); //redraw
        } else if (e.keyCode == 40) {
            console.log("DOWN");
            ctxBigCanvas.clearRect(0, 0, 600, 700); //clear canvas
            positionY += 5; //adjust positionY
            ctxBigCanvas.drawImage(originalStickFigure, positionX, positionY); //redraw
        } else console.log("NOT AN ARROW");
    }
})();

//ctx.clearRect(startX, startY, endX, endY)
