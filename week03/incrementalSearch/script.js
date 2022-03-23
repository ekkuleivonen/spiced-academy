(function (countries) {
    var inputField = $("main input");
    var resultsContainer = $("main #results");

    inputField.on("input", function () {
        resultsContainer.show();
        var value = inputField.val();
        console.log(value);

        if (!value) {
            resultsHtml = "";
            resultsContainer.html(resultsHtml); // todo: clear or empty the results container
            return;
        }

        var matches = []; // empties the array of matches on every round

        for (var i = 0; i < countries.length; i++) {
            //check if input matches anything on the list
            if (countries[i].toLowerCase().startsWith(value.toLowerCase())) {
                console.log(countries[i], "starts with ", value);
                // add each match to an array of matches
                matches.push(countries[i]);

                if (matches.length == 4) {
                    break; //breaking the loop after 4 results
                }
            }
        }

        var resultsHtml = "";

        if (matches.length > 0) {
            for (var j = 0; j < matches.length; j++) {
                resultsHtml += "<p>" + matches[j] + "</p>";
            }
            resultsContainer.html(resultsHtml);
        } else {
            resultsContainer.html("<p>No results</p>"); //todo: show no results message
        }
    });

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
})([
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Côte D'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic People's Republic of Korea",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People’s Democratic Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Republic of Korea",
    "Republic of Moldova",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Tajikistan",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United Republic of Tanzania",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Viet Nam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
]);
