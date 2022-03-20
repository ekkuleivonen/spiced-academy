(function () {
    //canvas setup
    var canvas = document.getElementById("canvasOne");
    var ctx = canvas.getContext("2d");
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    //grab image
    var img = document.getElementById("cat400");
    //place original image
    ctx.drawImage(img, 0, 0);
    //set samplearea size
    var sampleWidth = canvasWidth / 50;
    console.log("Sample width in PX: ", sampleWidth);
    var sampleHeight = canvasHeight / 50;
    console.log("Sample height in PX: ", sampleHeight);
    //store sampleset
    var sampleSet = [];
    //Add brightness calculation for AreaSelection prototype
    AreaSelection.prototype.calculation = function areaBrightness() {
        //get pixel data for a selected area
        var selectedPixelDataObj = ctx.getImageData(
            this.location[0],
            this.location[1],
            sampleWidth,
            sampleHeight
        );
        //turn object into an array
        var selectedPixelData = selectedPixelDataObj.data;
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

        return areaAvg;
    };
    //constructor for AreaSelection object
    function AreaSelection(positionX, positionY) {
        this.location = [positionX, positionY];
        this.size = [sampleWidth, sampleHeight];
    }
    sampleCanvas(); //create objects for all area selections
    function sampleCanvas() {
        for (var y = 0; y < canvasHeight; y += sampleHeight) {
            //run through rows
            for (var x = 0; x < canvasWidth; x += sampleHeight) {
                var index = 0;
                sampleSet.push(new AreaSelection(x, y, index));
            }
        }
        console.log(sampleSet);
        return sampleSet;
    }
    //tests

    for (var i = 0; i < sampleSet.length; i++) {
        var temp = sampleSet[i].calculation();
        if (temp <= 255 && temp > 200) {
            ctx.fillStyle = "#FFFFFF";
        } else if (temp <= 200 && temp > 150) {
            ctx.fillStyle = "#E0E0E0";
        } else if (temp <= 150 && temp > 100) {
            ctx.fillStyle = "#B8B8B8";
        } else if (temp <= 100 && temp > 50) {
            ctx.fillStyle = "#666666";
        } else if (temp <= 50 && temp > 25) {
            ctx.fillStyle = "#242424";
        } else if (temp <= 25) {
            ctx.fillStyle = "#000000";
        }
        console.log(
            "Brightness: ",
            sampleSet[i].calculation(),
            "Fillstyle: ",
            ctx.fillStyle
        );
        ctx.fillRect(
            sampleSet[i].location[0],
            sampleSet[i].location[1],
            sampleWidth,
            sampleHeight
        );
    }
})();
