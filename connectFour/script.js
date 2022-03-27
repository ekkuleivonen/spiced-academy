//currentPlayers
var player1 = document.getElementById("player1");
var player2 = document.getElementById("player2");
var currentPlayer = "Player 1";
var canPlay = true;
var isActive = false;

//store coins
var coins = [];

//Constructor for a new coin object
function Coin(column, row, currentPlayer, div) {
    this.column = column;
    this.row = row;
    this.currentPlayer = currentPlayer;
    this.div = div;
}

//Coin prototype has another method that creates the real div on call
Coin.prototype.createDiv = function (coinBelongsTo, currentPlayer) {
    if (currentPlayer == "Player 1") {
        //style and place Mid player1 div
        player1Mid.classList.add("midPlayer1");
        coinBelongsTo.appendChild(player1Mid);
        player1Pre.remove();
        return player1Mid;
    } else if (currentPlayer == "Player 2") {
        //style and place Mid player2 div
        player2Mid.classList.add("midPlayer2");
        coinBelongsTo.appendChild(player2Mid);
        player2Pre.remove();
        return player2Mid;
    }
};

//create unassigned Coin objects for the whole board
for (var r = 0; r < 6; r++) {
    for (var c = 0; c < 7; c++) {
        coins.push(new Coin(c, r, null, null));
    }
}

//Click on currentPlayer creates a Preorary coin div
player1.addEventListener("click", createPreDiv);
player2.addEventListener("click", createPreDiv);
var player1Pre = document.createElement("div");
var player2Pre = document.createElement("div");
function createPreDiv(e) {
    if (!canPlay) return;
    isActive = true;
    if (
        e.target.classList.contains("player1coin") &&
        currentPlayer == "Player 1"
    ) {
        //style and place Pre player1 div
        player1Pre.classList.add("prePlayer1");
        document.body.appendChild(player1Pre);
        currentPlayer = "Player 1";
        //remove player1 Pre
        player2Pre.remove();
    } else if (
        e.target.classList.contains("player2coin") &&
        currentPlayer == "Player 2"
    ) {
        //style and place Pre player2 div
        player2Pre.classList.add("prePlayer2");
        document.body.appendChild(player2Pre);
        currentPlayer = "Player 2";
        //remove player2 Pre
        player1Pre.remove();
    }
}

//Grab columns
var columns = document.getElementsByClassName("columnGlow");

//Listen to which column will receive the coin
for (var i = 0; i < columns.length; i++) {
    columns[i].addEventListener("mouseover", findCoinColumn);
}

//Store index of column where the coin is dropped
var coinBelongsTo;
var columnIndex;
function findCoinColumn(e) {
    coinBelongsTo = e.target;
    var parent = e.target.parentElement;
    columnIndex = Array.prototype.indexOf.call(parent.children, e.target);
    return coinBelongsTo, columnIndex;
}

//Space deletes PreDiv and places realDiv in the correct column
var player1Mid;
var player2Mid;
document.addEventListener("keydown", placeCoin);
function placeCoin(e) {
    if (!isActive) return;
    if (!canPlay) return;
    if (coinBelongsTo.childElementCount > 5) return;
    player1Mid = document.createElement("div");
    player2Mid = document.createElement("div");
    if (e.keyCode == 32) {
        //update correct coin object with data
        for (var idx = 0; idx < coins.length; idx++) {
            if (
                coins[idx].column == columnIndex &&
                coins[idx].row == coinBelongsTo.childElementCount
            ) {
                coins[idx].currentPlayer = currentPlayer;
                coins[idx].div = Coin.prototype.createDiv(
                    coinBelongsTo,
                    currentPlayer
                );
                break;
            }
        }

        isActive = false;
        if (currentPlayer == "Player 1") {
            player2.classList.remove("notActive");
            player1.classList.add("notActive");
        } else if (currentPlayer == "Player 2") {
            player1.classList.remove("notActive");
            player2.classList.add("notActive");
        }
        checkRow(coinBelongsTo.childElementCount - 1);
        checkColumn(columnIndex);
        checkDiagonal(columnIndex, coinBelongsTo.childElementCount - 1);
        //set next player
        if (currentPlayer == "Player 1") {
            return (currentPlayer = "Player 2");
        } else if (currentPlayer == "Player 2") {
            return (currentPlayer = "Player 1");
        }
    }
}

//identify winner

//filter by row, order by column and then look for 4 continuous hits for the same player

function checkRow(row) {
    var rowArr = coins.filter((Coin) => {
        return Coin.row === row;
    });
    rowArr.sort((a, b) => {
        return a.column - b.column;
    });
    var str = "";
    for (var r = 0; r < rowArr.length; r++) {
        if (rowArr[r].currentPlayer == currentPlayer) {
            str += "w";
        } else {
            str += "l";
        }
    }
    if (str.indexOf("wwww") > -1) {
        startOfWinningArr = str.indexOf("wwww");
        victory(currentPlayer, rowArr);
    }
}

//filter by column, order by row and then look for 4 continuous hits for the same player
function checkColumn(column) {
    var columnArr = coins.filter((Coin) => {
        return Coin.column === column;
    });
    columnArr.sort((a, b) => {
        return a.row - b.row;
    });
    var str = "";
    for (var c = 0; c < columnArr.length; c++) {
        if (columnArr[c].currentPlayer == currentPlayer) {
            str += "w";
        } else {
            str += "l";
        }
    }
    if (str.indexOf("wwww") > -1) {
        startOfWinningArr = str.indexOf("wwww");
        victory(currentPlayer, columnArr);
    }
}

function checkDiagonal(colIdx, rowIdx) {
    // 1. calculate the sum of colIdx + rowIdx
    var diagCheck1 = colIdx + rowIdx;
    // 2. calculate the diff of colIdx - rowIdx
    var diagCheck2 = colIdx - rowIdx;
    // 3. create two empty arrays diag1 and diag2
    var diag1 = [];
    var diag2 = [];
    // If sum of row idx and colmun idx match anything on diagcheck1 --> push
    for (var i = 0; i < coins.length; i++) {
        if (coins[i].row + coins[i].column == diagCheck1) {
            diag1.push(coins[i]);
        }
    }
    // If difference of row idx and colun idx match anything on diagcheck 2 --> push
    for (var j = 0; j < coins.length; j++) {
        if (coins[j].row - coins[j].column == diagCheck2) {
            diag2.push(coins[j]);
        }
    }

    checkDiag1(diag1);
    function checkDiag1(diag1) {
        var str = "";
        for (var d1 = 0; d1 < diag1.length; d1++) {
            if (diag1[d1].currentPlayer == currentPlayer) {
                str += "w";
            } else {
                str += "l";
            }
        }
        if (str.indexOf("wwww") > -1) {
            startOfWinningArr = str.indexOf("wwww");
            victory(currentPlayer, diag1);
        }
    }
    checkDiag2(diag2);
    function checkDiag2(diag2) {
        var str = "";
        for (var d2 = 0; d2 < diag2.length; d2++) {
            if (diag2[d2].currentPlayer == currentPlayer) {
                str += "w";
            } else {
                str += "l";
            }
        }
        if (str.indexOf("wwww") > -1) {
            startOfWinningArr = str.indexOf("wwww");
            victory(currentPlayer, diag2);
        }
    }
}

//Game Over
var startOfWinningArr;
var h1 = document.querySelector("h1");
var helperText = document.querySelector(".instructions p");
function victory(currentPlayer, winningLine) {
    canPlay = false;
    for (var b = 0; b < winningLine.length; b++) {
        if (
            winningLine[b].currentPlayer == currentPlayer &&
            winningLine.indexOf(winningLine[b]) >= startOfWinningArr &&
            winningLine.indexOf(winningLine[b]) < startOfWinningArr + 5
        ) {
            winningLine[b].div.classList.add("victory");
        }
    }
    player1.classList.add("notActive");
    player2.classList.add("notActive");
    btn.innerText = "Play again";
    h1.innerText = currentPlayer + " Wins!";
    helperText.innerText =
        'Restart the game by pressing "Play again" on the bottom right corner.';
}

//reset the game
var btn = document.getElementById("btn");
btn.addEventListener("click", resetGame);
function resetGame() {
    canPlay = true;
    btn.innerText = "Reset";
    h1.innerText = "Connect Four";
    helperText.innerText =
        "Click on player to start, use your mouse to find a position for the coin and release it with the space key.";
    //delete player1 coins
    var player1Coins = document.querySelectorAll(".midPlayer1");
    for (var i = 0; i < player1Coins.length; i++) {
        player1Coins[i].remove();
    }
    //delete player2 coins
    var player2Coins = document.querySelectorAll(".midPlayer2");
    for (var j = 0; j < player2Coins.length; j++) {
        player2Coins[j].remove();
    }
    // empty coins array
    coins = [];
    //create unassigned Coin objects for the whole board
    for (var r = 0; r < 6; r++) {
        for (var c = 0; c < 7; c++) {
            coins.push(new Coin(c, r, null, null));
        }
    }
    //set player status back to normal
    player1.classList.remove("notActive");
    player2.classList.add("notActive");
    currentPlayer = "Player 1";
    //remove  Pre divs
    player1Pre.remove();
    player2Pre.remove();
}

//move Pre divs with mouse
var mouseX;
var mouseY;
document.addEventListener("mousemove", trackMouse);
function trackMouse(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    player1Pre.style.left = mouseX + "px";
    player1Pre.style.top = mouseY + "px";
    player2Pre.style.left = mouseX + "px";
    player2Pre.style.top = mouseY + "px";
}
