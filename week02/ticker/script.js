(function () {
    //variables to hold the elements we use repeadetly so that we dont need to get them again and again
    var ticker = document.getElementById("ticker");
    var headlines = document.getElementById("headlines");
    var links = document.getElementsByTagName("A");
    var left = headlines.offsetLeft;
    var id;
    //listen if hover is taking place
    ticker.addEventListener("mouseover", pause, false);
    ticker.addEventListener("mouseout", start, false);

    function start() {
        id = requestAnimationFrame(moveHeadlines);
    }

    function pause() {
        cancelAnimationFrame(id);
    }

    moveHeadlines();
    function moveHeadlines() {
        left--;
        if (left <= -links[0].offsetWidth) {
            console.log("time to append");
            left += links[0].offsetWidth;
            headlines.appendChild(links[0]);
        }
        headlines.style.left = left + "px";
        id = requestAnimationFrame(moveHeadlines);
    }
})();
