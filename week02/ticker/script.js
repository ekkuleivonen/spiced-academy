(function () {
    //variables to hold the elements we use repeadetly so that we dont need to get them again and again
    var ticker = document.getElementById("ticker");
    var headlines = document.getElementById("headlines");
    var links = document.getElementsByTagName("A");
    var left = headlines.offsetLeft;
    //listen if hover is taking place
    ticker.addEventListener("mouseover", shallAnimate, false);
    ticker.addEventListener("mouseout", shallAnimate, false);

    //function to keep track of the headlines left variable and moves it by one pixel at a time

    function shallAnimate() {
        if (!continueTicking) {
            continueTicking = true;
            window.requestAnimationFrame(moveHeadlines);
        } else {
            continueTicking = false;
            cancelAnimationFrame(stopId);
        }
    }

    moveHeadlines();

    function moveHeadlines() {
        if (!start || progress > 400) start = timestamp;
        {
            left--;
            //Check if first link is entirely off screen
            if (left <= -links[0].offsetWidth) {
                console.log("time to append");
                //For link question, add its width to the "headlines" left positionto correct for the empty space created
                left += links[0].offsetWidth;
                //appendChild it to to end of the "headlines"
                headlines.appendChild(links[0]);
            }
            headlines.style.left = left + "px"; //instead of log --> set the "style.left" left for headlines(container of links)

            stopId = window.requestAnimationFrame(moveHeadlines);
        }
    }
})();
