//players
var white = document.getElementById("white");
var black = document.getElementById("black");
var player;

//move temp divs with mouse
var mouseX;
var mouseY;
document.addEventListener("mousemove", trackMouse);
function trackMouse(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    whiteTemp.style.left = mouseX + "px";
    whiteTemp.style.top = mouseY + "px";
    blackTemp.style.left = mouseX + "px";
    blackTemp.style.top = mouseY + "px";
}

//Constructor for a new coin object
function Coin(column, row, player) {
    this.column = column;
    this.row = row;
    this.player = player;
}

//Coin prototype has another method that creates the real div on call
Coin.prototype.createDiv = function (coinBelongsTo, player) {
    if (player == "white") {
        //style and place final white div
        whiteFinal.classList.add("finalWhite");
        coinBelongsTo.appendChild(whiteFinal);
        whiteTemp.remove();
        white.classList.remove("active");
        black.classList.add("active");
        player = "black";
    } else if (player == "black") {
        //style and place final black div
        blackFinal.classList.add("finalBlack");
        coinBelongsTo.appendChild(blackFinal);
        blackTemp.remove();
        black.classList.remove("active");
        white.classList.add("active");
        player = "white";
    }
};
var coins = [];

//click on player color constructs a new piece object and adds class temp to the object's div
white.addEventListener("click", createTempDiv);
black.addEventListener("click", createTempDiv);
//Create a temporary div before object is created
var whiteTemp = document.createElement("div");
var blackTemp = document.createElement("div");
function createTempDiv(e) {
    if (e.target.classList.contains("white")) {
        //style and place temp white div
        whiteTemp.classList.add("tempWhite");
        document.body.appendChild(whiteTemp);
        player = "white";
        white.classList.add("active");
        black.classList.remove("active");
        blackTemp.remove();
    } else if (e.target.classList.contains("black")) {
        //style and place temp black div
        blackTemp.classList.add("tempBlack");
        document.body.appendChild(blackTemp);
        player = "black";
        black.classList.add("active");
        white.classList.remove("active");
        whiteTemp.remove();
    }
}

//Grab columns
var columnOne = document.getElementById("one");
var columnTwo = document.getElementById("two");
var columnThree = document.getElementById("three");
var columnFour = document.getElementById("four");
var columnFive = document.getElementById("five");
var columnSix = document.getElementById("six");
var columnSeven = document.getElementById("seven");
//Listen to which column will receive the coin
columnOne.addEventListener("mouseover", findCoinColumn);
columnTwo.addEventListener("mouseover", findCoinColumn);
columnThree.addEventListener("mouseover", findCoinColumn);
columnFour.addEventListener("mouseover", findCoinColumn);
columnFive.addEventListener("mouseover", findCoinColumn);
columnSix.addEventListener("mouseover", findCoinColumn);
columnSeven.addEventListener("mouseover", findCoinColumn);

//Hold memory for last column hover
var coinBelongsTo;
//Store index of column
var columnIndex;
function findCoinColumn(e) {
    coinBelongsTo = e.target;
    var parent = e.target.parentElement;
    columnIndex = Array.prototype.indexOf.call(parent.children, e.target);
    return coinBelongsTo, columnIndex;
}

//Space deletes tempDiv and places realDiv in the correct column
var whiteFinal;
var blackFinal;
document.addEventListener("keydown", placeCoin);
function placeCoin(e) {
    whiteFinal = document.createElement("div");
    blackFinal = document.createElement("div");
    if (e.keyCode == 32) {
        coins.push(
            new Coin(columnIndex, coinBelongsTo.childElementCount, player)
        );
        Coin.prototype.createDiv(coinBelongsTo, player);
        player = null;
    }
}
