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
