(function () {
    //variables to hold the elements we use repeadetly so that we dont need to get them again and again
    var ticker = $("#ticker");
    var headlines = $("#headlines");
    var links = $("a");
    var left = $(headlines).offset().left;
    var id;
    //listen if hover is taking place
    ticker.on("mouseover", pause, false);
    ticker.on("mouseout", start, false);
    //start function
    function start() {
        id = requestAnimationFrame(moveHeadlines);
    }
    //pause function
    function pause() {
        cancelAnimationFrame(id);
    }
    //animation function
    moveHeadlines();
    function moveHeadlines() {
        left--;
        if (left <= -links.eq(0).outerWidth()) {
            console.log("time to append upper");
            left += $(links.eq(0)).outerWidth();
            headlines.append(links.eq(0));
            links = $("a");
        }
        headlines.css({ left: left });
        id = requestAnimationFrame(moveHeadlines);
    }
})();
