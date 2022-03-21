(function () {
    //grab button
    var button = document.getElementById("startButton");

    //grab video
    var video = document.querySelector("video");

    //canvas setup
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    //stream webcam on video element
    button.onclick = function (e) {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(function (stream) {
                if ("srcObject" in video) {
                    video.srcObject = stream;
                } else {
                    video.src = window.URL.createObjectURL(stream);
                }
                video.onloadedmetadata = function (e) {
                    video.play();
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                };
            });
    };

    //set samplearea size
    var sampleWidth = canvas.width / 75;
    console.log("Sample width in PX: ", sampleWidth);
    var sampleHeight = canvas.height / 75;
    console.log("Sample height in PX: ", sampleHeight);
    //store sampleset
    var sampleSet = [];

    //constructor for AreaSelection object
    function AreaSelection(positionX, positionY) {
        this.location = [positionX, positionY];
        this.size = [sampleWidth, sampleHeight];
    }

    //get ready for ascii lettering
    ctx.font = "bold " + sampleWidth * 1.5 + "px serif";

    //place video on canvas
    video.addEventListener(
        "play",
        function () {
            var $this = this; //cache
            (function loop() {
                if (!$this.paused && !$this.ended) {
                    //ctx.clearRect(0, 0, canvas.length, canvas.height);
                    ctx.drawImage($this, 0, 0);
                    //Add brightness calculation for AreaSelection prototype
                    AreaSelection.prototype.calculation =
                        function areaBrightness() {
                            //get pixel data for a selected area for each frame
                            var selectedFrameArea = ctx.getImageData(
                                this.location[0],
                                this.location[1],
                                sampleWidth,
                                sampleHeight
                            );
                            //turn object into an array
                            var selectedPixelData = selectedFrameArea.data;
                            var areaSum = 0; //accumulate brightness of each pixel
                            //Loop through each pixel in selection (every 4th value in the array)
                            for (
                                var i = 0;
                                i < selectedPixelData.length;
                                i += 4
                            ) {
                                var singlePx = selectedPixelData.slice(
                                    i,
                                    i + 4
                                ); //Separate each pixel from array
                                pxBrightness(singlePx); //Calculate pixel brightness for the separated pixel
                                function pxBrightness(singlePx) {
                                    var pxAvg =
                                        (singlePx[0] +
                                            singlePx[1] +
                                            singlePx[2]) /
                                        3; //Average the RGB values of pixel
                                    areaSum = areaSum += pxAvg; //add pixel brightness to accumulation
                                    return pxAvg;
                                }
                            }
                            var areaAvg =
                                areaSum / (selectedPixelData.length / 4); //average area brightness

                            return areaAvg;
                        };
                    //create objects for all area selections
                    sampleCanvas();
                    function sampleCanvas() {
                        //run through rows
                        for (var y = 0; y < canvas.height; y += sampleHeight) {
                            //run through columns
                            for (
                                var x = 0;
                                x < canvas.width;
                                x += sampleHeight
                            ) {
                                var index = 0;
                                sampleSet.push(new AreaSelection(x, y, index));
                            }
                        }
                        return sampleSet;
                    }
                    for (var i = 0; i < sampleSet.length; i++) {
                        var temp = sampleSet[i].calculation();

                        ctx.clearRect(
                            sampleSet[i].location[0],
                            sampleSet[i].location[1],
                            sampleWidth,
                            sampleHeight
                        );
                        if (temp <= 255 && temp > 226) {
                            ctx.fillText(
                                " ",
                                sampleSet[i].location[0],
                                sampleSet[i].location[1]
                            ); //1 " "
                        } else if (temp <= 226 && temp > 200) {
                            ctx.fillText(
                                ".",
                                sampleSet[i].location[0],
                                sampleSet[i].location[1]
                            ); //2 "."
                        } else if (temp <= 200 && temp > 175) {
                            ctx.fillText(
                                ":",
                                sampleSet[i].location[0],
                                sampleSet[i].location[1]
                            ); //3 ":"
                        } else if (temp <= 175 && temp > 150) {
                            ctx.fillText(
                                "-",
                                sampleSet[i].location[0],
                                sampleSet[i].location[1]
                            ); //4 "-"
                        } else if (temp <= 150 && temp > 125) {
                            ctx.fillText(
                                "=",
                                sampleSet[i].location[0],
                                sampleSet[i].location[1]
                            ); //5 "="
                        } else if (temp <= 125 && temp > 100) {
                            ctx.fillText(
                                "+",
                                sampleSet[i].location[0],
                                sampleSet[i].location[1]
                            ); //6 "+"
                        } else if (temp <= 100 && temp > 75) {
                            ctx.fillText(
                                "*",
                                sampleSet[i].location[0],
                                sampleSet[i].location[1]
                            ); //7 "*"
                        } else if (temp <= 75 && temp > 50) {
                            ctx.fillText(
                                "#",
                                sampleSet[i].location[0],
                                sampleSet[i].location[1]
                            ); //8 "#"
                        } else if (temp <= 50 && temp > 25) {
                            ctx.fillText(
                                "%",
                                sampleSet[i].location[0],
                                sampleSet[i].location[1]
                            ); //9 "%"
                        } else if (temp <= 25) {
                            ctx.fillText(
                                "@",
                                sampleSet[i].location[0],
                                sampleSet[i].location[1]
                            ); //10 "@"
                        }
                    }
                    sampleSet = [];

                    setTimeout(loop, 1000 / 15); // drawing at 30fps
                }
            })();
        },
        0
    );

    //tests
})();
