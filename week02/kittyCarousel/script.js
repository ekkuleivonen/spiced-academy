(function () {
    //get variables
    var carousel = document.getElementById("kitties");
    var images = document.querySelectorAll("#kitties img");
    var dots = document.querySelectorAll("#dots div");
    var timeOutId;
    var transitioning = false;
    var currentImg = 0; //variable to keep track on image currently on screen
    //Identify time to move images back to stack 1
    carousel.addEventListener("transitionend", function (e) {
        if (e.target.classList.contains("exit")) {
            e.target.classList.remove("exit"); //remove the exit class from target image
            transitioning = false;
            timeoutId = setTimeout(moveKitties, 3000); //set timeout for the next moveKitties invocation
        }
    });

    //Add classes to move images and toggle dots
    function moveKitties(idx) {
        transitioning = true;
        images[currentImg].classList.remove("onscreen"); //remove onscreen class from kitty at the current index
        dots[currentImg].classList.remove("selected");
        images[currentImg].classList.add("exit"); //add the exit class to kitty at the current index
        if (idx == undefined) {
            currentImg++; //take in next image for processing
            if (currentImg === images.length) {
                currentImg = 0; //reset current image tracker when all images processed
            }
        } else currentImg = idx; //assing idx to current

        images[currentImg].classList.add("onscreen"); //add the onscreen class to kitty at the current index
        dots[currentImg].classList.add("selected");
    }
    timeoutId = setTimeout(moveKitties, 3000);

    //converting arraylike to an actual array to access array methods
    Array.prototype.slice.call(dots).forEach(function (dot, idx) {
        dot.addEventListener("click", function () {
            //if transition active --> ignore click
            if (transitioning == true) return;
            //if image already on screen --> ignore click
            if (idx == currentImg) return;
            console.log("user just clicked a dot with index: ", idx);
            clearTimeout(timeoutId);

            moveKitties(idx);
        });
    });
})();
