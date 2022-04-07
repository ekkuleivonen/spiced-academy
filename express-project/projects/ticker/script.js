(function () {
    //getting link data from JSON
    $.ajax({
        url: "http://127.0.0.1:5500/week02/ticker/links.json",
        method: "GET",
        data: {
            limit: 20,
        },
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var link = $("<a>", {
                    text: data[i].text,
                    href: data[i].url,
                    target: "_blank",
                });
                link.appendTo(headlines);
            }
            //grab appended links
            links = $("a");
            //links appended --> time to start animating
            moveHeadlines();
        },
    });

    //variables to hold the elements we use repeadetly so that we dont need to get them again and again
    var ticker = $("#ticker");
    var headlines = $("#headlines");
    var links;
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
    function moveHeadlines() {
        left--;
        if (left <= -links.eq(0).outerWidth()) {
            left += $(links.eq(0)).outerWidth();
            headlines.append(links.eq(0));
            links = $("a");
        }
        headlines.css({ left: left });
        id = requestAnimationFrame(moveHeadlines);
    }
})();
