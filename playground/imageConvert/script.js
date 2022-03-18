(function () {
    //canvas setup
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    //create position memory
    var positionX = 200;
    var positionY = 200;
    //grab image
    var img = document.getElementById("cat400");
    //fill canvas with content (now a rectancle, later image or video...)
    ctx.fillStyle = "#f4c0de";
    ctx.fillRect(0, 0, 400, 400);
    ctx.drawImage(img, 0, 0);
    //set sample Area size
    var sampleWidth = canvasWidth / 48;
    var sampleHeight = canvasHeight / 48;
    //get pixel object for a selected area
    var selectedPixelDataObj = ctx.getImageData(
        positionX,
        positionY,
        sampleWidth,
        sampleHeight
    );
    //turn object into an array
    var selectedPixelData = selectedPixelDataObj.data;

    //Calculate avg brightness for given area on canvas

    areaBrightness();
    function areaBrightness() {
        var areaSum = 0; //accumulate brightness of each pixel
        //Loop through each pixel in selection (every 4th value in the array)
        for (var i = 0; i < selectedPixelData.length; i += 4) {
            var singlePx = selectedPixelData.slice(i, i + 4); //Separate each pixel from array
            pxBrightness(singlePx); //Calculate pixel brightness for the separated pixel
            function pxBrightness(singlePx) {
                var pxAvg = (singlePx[0] + singlePx[1] + singlePx[2]) / 3; //Average the RGB values of pixel
                areaSum = areaSum += pxAvg; //add pixel brightness to accumulation
                return pxAvg;
            }
        }
        var areaAvg = areaSum / (selectedPixelData.length / 4); //average area brightness
        console.log("Brightness value of area: ", areaAvg);
    }

    // Create all needed areas to cover whole canvas
})();
