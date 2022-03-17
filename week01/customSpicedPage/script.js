(function () {
    //DARK MODE TOGGLE
    var checkbox = document.getElementById("checkbox");
    checkbox.addEventListener("change", () => {
        //chnage the theme of the website
        document.body.classList.toggle("dark");
        document.querySelector(".hero-section").classList.toggle("dark");
        document.querySelector(".benefits-section").classList.toggle("dark");
        document.querySelector("header").classList.toggle("dark");
        document.querySelector("button").classList.toggle("dark");

        function turnH2sDark() {
            var h2s = document.querySelectorAll("h2");
            for (var i = 0; i < h2s.length; i++) {
                h2s[i].classList.toggle("dark");
            }
        }
        turnH2sDark();

        function turnPsDark() {
            var ps = document.querySelectorAll("p");
            for (var i = 0; i < ps.length; i++) {
                ps[i].classList.toggle("dark");
            }
        }
        turnPsDark();
    });

    //MENU TOGGLE

    //Store my elements in variables
    var menuButton = document.getElementById("menu");
    console.log(menuButton);
    var wholeMenu = document.getElementById("menuPopUp");
    var sideMenu = document.getElementById("sideMenu");
    var exitButton = document.getElementById("exitButton");

    //TOGGLE MENU ON
    menuButton.addEventListener("click", menuOn);
    function menuOn() {
        console.log("menuON");
        wholeMenu.classList.add("isVisible");
        sideMenu.classList.add("isVisible");
    }

    //TOGGLE MENU OFF
    wholeMenu.addEventListener("click", menuOff);
    exitButton.addEventListener("click", menuOff);
    function menuOff(e) {
        if (e.target == sideMenu) {
            return;
        }
        e.stopPropagation();
        wholeMenu.classList.remove("isVisible");
        sideMenu.classList.remove("isVisible");
    }
})();
