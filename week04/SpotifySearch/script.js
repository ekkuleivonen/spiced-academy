(function () {
    //Dom variables
    var textInputField = $("#textInput");
    var searchTypeSelector = $("#searchType");
    var searchBtn = $("#searchBtn");
    var nextBtn;
    var resultsSection = $(".results");
    //Search variables
    var isNewSearch = false;
    var searchType = "artist";
    var searchInputValue;
    var searchUrl = "https://spicedify.herokuapp.com/spotify";
    var nextUrl;
    //Update searchInput value upon typing
    textInputField.on("keydown", function () {
        searchInputValue = textInputField.val();
        isNewSearch = true;
    });
    //Update searchType upon selection
    searchTypeSelector.on("change", function () {
        searchType = searchTypeSelector.val();
        searchInputValue = textInputField.val();
        searchUrl = "https://spicedify.herokuapp.com/spotify";
    });

    //Artist Constructor
    function Artist(artistName, followerCount, imgUrl, externalUrl) {
        this.artistName = artistName;
        this.followerCount = followerCount;
        this.imgUrl = imgUrl;
        this.externalUrl = externalUrl;
    }
    //Album Constructor
    function Album(albumName, artistName, imgUrl, externalUrl) {
        this.albumName = albumName;
        this.artistName = artistName;
        this.imgUrl = imgUrl;
        this.externalUrl = externalUrl;
    }
    //Trigger Get request to spotify on searchBtn click
    searchBtn.on("click", getDataFromSpotify);
    //Define get request to spotify
    function getDataFromSpotify() {
        //make request
        $.ajax({
            url: searchUrl,
            method: "GET",
            data: {
                type: searchType,
                q: searchInputValue,
            },
            success: function (data) {
                //delete old next button
                var oldNextButton = $(".nextBtn");
                oldNextButton.remove();
                //empty results if newSearch
                if (isNewSearch) {
                    var allResults = $(".result");
                    for (var k = 0; k < allResults.length; k++) {
                        allResults[k].remove();
                    }
                }
                console.log(data);
                if (searchTypeSelector.val() == "artist") {
                    //check if more results available (next url is null or not?) --show next button or not? (use modified next url for next request)
                    //Create artists from data
                    var artistArr = [];
                    for (var i = 0; i < data.artists.items.length; i++) {
                        //Safeguard against artists without images
                        var imgUrlArtist;
                        if (data.artists.items[i].images.length == 0) {
                            imgUrlArtist = "artists_default.jpeg";
                        } else {
                            imgUrlArtist = data.artists.items[i].images[0].url;
                        }
                        artistArr.push(
                            new Artist(
                                data.artists.items[i].name,
                                data.artists.items[i].followers.total,
                                imgUrlArtist,
                                data.artists.items[i].external_urls.spotify
                            )
                        );
                    }
                    console.log(artistArr);
                    //call the append albums function with the current array
                    appendArtists(artistArr);
                    //call next button creator
                    if (data.artists.next != null) {
                        nextUrl =
                            data.artists.next &&
                            data.artists.next.replace(
                                "api.spotify.com/v1/search",
                                "spicedify.herokuapp.com/spotify"
                            );
                        createNextBtn();
                        isNewSearch = false;
                    }
                }
                if (searchTypeSelector.val() == "album") {
                    //check if more results available (next url is null or not?)  --show next button or not? (use modified next url for next request)
                    //Create albums from data
                    var albumArr = [];
                    for (var j = 0; j < data.albums.items.length; j++) {
                        //Safeguard against artists without images
                        var imgUrlAlbum;
                        if (data.albums.items[j].images.length == 0) {
                            imgUrlAlbum = "albums_default.jpeg";
                        } else {
                            imgUrlAlbum = data.albums.items[j].images[0].url;
                        }
                        albumArr.push(
                            new Album(
                                data.albums.items[j].name,
                                data.albums.items[j].artists[0].name,
                                imgUrlAlbum,
                                data.albums.items[j].external_urls.spotify
                            )
                        );
                    }
                    console.log(albumArr);
                    //call the append albums function with the current array
                    appendAlbums(albumArr);
                    //call next button creator
                    if (data.albums.next != null) {
                        nextUrl =
                            data.albums.next &&
                            data.albums.next.replace(
                                "api.spotify.com/v1/search",
                                "spicedify.herokuapp.com/spotify"
                            );
                        createNextBtn();
                        isNewSearch = false;
                    }
                }
            },
        });
    }
    //function for appending the found artists on to the results div
    function appendArtists(artistArr) {
        //empty all album Results
        var albumResults = $(".albumResult");
        for (var j = 0; j < albumResults.length; j++) {
            albumResults[j].remove();
        }
        for (var i = 0; i < artistArr.length; i++) {
            //create elements for artist results
            var artistResult = document.createElement("div");
            var artistImgHolder = document.createElement("div");
            var artistImg = document.createElement("img");
            var artistTextHolder = document.createElement("div");
            var artistH2 = document.createElement("h2");
            var artistParagraph = document.createElement("p");
            //set classes for artist elements
            artistResult.classList.add("result", "artistResult");
            artistImgHolder.classList.add("imgHolder");
            artistTextHolder.classList.add("textHolder");
            //place data in the elements
            artistImg.src = artistArr[i].imgUrl;
            artistH2.innerText = artistArr[i].artistName;
            artistParagraph.innerText =
                artistArr[i].followerCount + " followers";
            ////add link to result div block
            //append elements
            resultsSection.append(artistResult);
            artistResult.append(artistImgHolder);
            artistResult.append(artistTextHolder);
            artistImgHolder.append(artistImg);
            artistTextHolder.append(artistH2);
            artistTextHolder.append(artistParagraph);
        }
    }

    //function for appending the found albums on to the results div
    function appendAlbums(albumArr) {
        //empty all artist Results
        var artistResults = $(".artistResult");
        for (var j = 0; j < artistResults.length; j++) {
            artistResults[j].remove();
        }
        for (var i = 0; i < albumArr.length; i++) {
            // create elements for album results
            var albumResult = document.createElement("div");
            var albumImgHolder = document.createElement("div");
            var albumImg = document.createElement("img");
            var albumTextHolder = document.createElement("div");
            var albumH2 = document.createElement("h2");
            var albumParagraph = document.createElement("p");
            //set classes for album elements
            albumResult.classList.add("result");
            albumResult.classList.add("albumResult");
            albumImgHolder.classList.add("imgHolder");
            albumTextHolder.classList.add("textHolder");
            //place data in the elements
            albumImg.src = albumArr[i].imgUrl;
            albumH2.innerText = albumArr[i].albumName;
            albumParagraph.innerText = albumArr[i].artistName;
            //append elements
            resultsSection.append(albumResult);
            albumResult.append(albumImgHolder);
            albumResult.append(albumTextHolder);
            albumImgHolder.append(albumImg);
            albumTextHolder.append(albumH2);
            albumTextHolder.append(albumParagraph);
        }
    }

    //function for creating an update next button
    function createNextBtn() {
        nextBtn = document.createElement("button");
        nextBtn.classList.add("nextBtn");
        nextBtn.innerText = "Show more";
        nextBtn.addEventListener("click", function () {
            //call the ajax again BUT WITH THE NEXT URL
            searchUrl = nextUrl;
            searchInputValue = "";
            searchType = "";
            getDataFromSpotify();
        });
        resultsSection.append(nextBtn);
    }
})();
