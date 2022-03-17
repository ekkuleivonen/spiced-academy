(function () {
    //canvas setup
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    //create position memory
    var positionX = 0;
    var positionY = 0;
    //fill canvas with content (now a rectancle, later image or video...)
    ctx.fillStyle = "#f4c0de";
    ctx.fillRect(0, 0, 400, 400);
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
    console.log("Pixel data for area :", selectedPixelData);

    //Calculate avg brightness for given area on canvas
    areaBrightness();
    function areaBrightness() {
        var areaSum = 0;
        //Loop through each pixel (every 4th value in the array)
        for (var i = 0; i < selectedPixelData.length; i += 4) {
            pxBrightness(selectedPixelData); //Calculate pixel brightness
            function pxBrightness(selectedPixelData) {
                for (var i = 0; i < selectedPixelData.length; i += 4) {
                    var singlePx = selectedPixelData.slice(i, i + 4); //Separate each pixel from array
                    var pxAvg = (singlePx[0] + singlePx[1] + singlePx[2]) / 3; //Average the RGB values of pixel
                    console.log("Brightness value of pixel: ", pxAvg);
                    areaSum = areaSum + pxAvg;
                    return areaSum;
                }
            }
        }
        var areaAvg = areaSum / (selectedPixelData.length / 4);
        console.log("Brightness value of area: ", areaAvg);
    }
})();
