(function () {
    //store cat image in a variable
    var img = document.getElementById("cat1200");
    console.log(img);
    //canvas setup
    var ctx = document.getElementById("canvas").getContext("2d");
    console.log(ctx);
    //draw cat image on canvas
    var positionX = 0;
    var positionY = 0;
    console.log(positionX, positionY);
    ctx.drawImage(img, positionX, positionY);
    console.log(ctx.drawImage(img, 0, 0));
    //Select a portion of an image to be drawn on canvas
})();
