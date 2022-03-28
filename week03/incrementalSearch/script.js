(function () {
    var inputField = $("main input");
    var resultsContainer = $("main #results");
    var inputValue;
    var matches;
    var resultsHtml = "";

    inputField.on("input", function () {
        matches = []; // empties the array of matches on every round
        resultsHtml = "";
        resultsContainer.show();
        inputValue = inputField.val();
        console.log(inputValue);

        //safeguard against empty input
        if (!inputValue) {
            resultsHtml = "";
            resultsContainer.html(resultsHtml); // todo: clear or empty the results container
            return;
        }

        //Getting contry data
        $.ajax({
            url: "https://spicedworld.herokuapp.com/",
            data: {
                q: inputValue,
            },
            success: function (data) {
                console.log(data);
                matches = data;
                updateSuggestions();
            },
        });
    });

    function updateSuggestions() {
        if (matches.length > 0) {
            for (var j = 0; j < matches.length; j++) {
                resultsHtml += "<p>" + matches[j] + "</p>";
            }
            resultsContainer.html(resultsHtml);
        } else {
            resultsContainer.html("<p>No results</p>"); //show no results message
        }
    }

    //event delegation allows us to have event listeners for elements that are created dynamcically
    resultsContainer
        .on("mouseover", "p", function (e) {
            //remove highlight class from all
            $("p").removeClass("highlight");
            //apply highlight class on the current one
            $(e.target).addClass("highlight");
        })
        .on("mousedown", "p", function (e) {
            //do something with event data from mouse down (e.target)
            //place event target value in a variable
            var selected = $(e.target).text();

            //set the value of the text field to the string contained by the event target
            inputField.val(selected);
            //empty and/or hide the results container
            resultsContainer.hide();
        });
    $(document).on("keydown", function (e) {
        if (e.keyCode == 40) {
            //if none of the results that are currently displayed have the highlight class, add the highlight class to the first one.
            if (!$("p").hasClass("highlight")) {
                $("p:nth-child(1)").addClass("highlight");
            } else if (
                $("p").hasClass("highlight") &&
                $("p.highlight").index() < $("p").length - 1
            ) {
                //if there is a result with the highlight class, and it is not the last result, remove the highlight class from it and add it to the next one
                var $current = $("p.highlight");
                $current.removeClass("highlight");
                $current.next().addClass("highlight");
            } else return;
        } else if (e.keyCode == 38) {
            if (!$("p").hasClass("highlight")) {
                $("p:nth-child(4)").addClass("highlight");
            } else if (
                $("p").hasClass("highlight") &&
                $("p.highlight").index() > 0
            ) {
                $current = $("p.highlight");
                $current.removeClass("highlight");
                $current.prev().addClass("highlight");
            } else return;
        } else if (e.keyCode == 13) {
            //do something
            var selected = $("p.highlight").text();
            inputField.val(selected);
            resultsContainer.hide();
        }
    });
    inputField
        .on("blur", function () {
            resultsContainer.hide();
        })
        .on("focus", function () {
            resultsContainer.show();
        });
})();
