(function () {
    /*
The dots should be clickable.
    //listen to every dot

When a user clicks a dot that is not lit up, the corresponding image slides in from the right.
    //add ONSCREEN image class for image that corresponds to dot
    //add EXIT image class for image that corresponds to dot
    //remove EXIT class from image that has it, and has transitioned

The image should slide in from the right even if its dot is to the left of the one that was lit up when the user clicks.
*/

    //get variables
    var carousel = document.getElementById("kitties");
    var images = document.querySelectorAll("#kitties img");
    var dots = document.querySelectorAll("#dots div");

    var currentImg = 0; //variable to keep track on image currently on screen
    //Identify time to move images back to stack 1
    carousel.addEventListener("transitionend", function (e) {
        if (e.target.classList.contains("exit")) {
            e.target.classList.remove("exit"); //remove the exit class from target image
            setTimeout(moveKitties, 3000); //set timeout for the next moveKitties invocation
        }
    });

    //dot 1 listener
    dots[0].addEventListener("click", function (e) {
        //check if dot is already selected
        if (!e.target.classList.contains("selected")) {
            console.log(e.target);
            console.log("dot 1 was clicked and is not selected");
            return moveKitties();
        }
    });

    //Add classes to move images and toggle dots
    function moveKitties() {
        images[currentImg].classList.remove("onscreen"); //remove onscreen class from kitty at the current index
        dots[currentImg].classList.remove("selected");
        images[currentImg].classList.add("exit"); //add the exit class to kitty at the current index
        currentImg++; //take in next image for processing
        if (currentImg === images.length) {
            currentImg = 0; //reset current image tracker when all images processed
        }
        images[currentImg].classList.add("onscreen"); //add the onscreen class to kitty at the current index
        dots[currentImg].classList.add("selected");
    }
    setTimeout(moveKitties, 3000);
})();
