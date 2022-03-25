//currentPlayers
var white = document.getElementById("white");
var black = document.getElementById("black");
var currentPlayer;

//store coins
var coins = [];
var coinsWhite = [];
var coinsBlack = [];

//Constructor for a new coin object
function Coin(column, row, currentPlayer) {
    this.column = column;
    this.row = row;
    this.currentPlayer = currentPlayer;
}

//Coin prototype has another method that creates the real div on call
Coin.prototype.createDiv = function (coinBelongsTo, currentPlayer) {
    if (currentPlayer == "white") {
        //style and place final white div
        whiteFinal.classList.add("finalWhite");
        coinBelongsTo.appendChild(whiteFinal);
        whiteTemp.remove();
        white.classList.remove("active");
        black.classList.add("active");
        currentPlayer = "black";
    } else if (currentPlayer == "black") {
        //style and place final black div
        blackFinal.classList.add("finalBlack");
        coinBelongsTo.appendChild(blackFinal);
        blackTemp.remove();
        black.classList.remove("active");
        white.classList.add("active");
        currentPlayer = "white";
    }
};

//Click on currentPlayer creates a temporary coin div
white.addEventListener("click", createTempDiv);
black.addEventListener("click", createTempDiv);
var whiteTemp = document.createElement("div");
var blackTemp = document.createElement("div");
function createTempDiv(e) {
    if (e.target.classList.contains("white")) {
        //style and place temp white div
        whiteTemp.classList.add("tempWhite");
        document.body.appendChild(whiteTemp);
        currentPlayer = "white";
        //toggle player indicators
        white.classList.add("active");
        black.classList.remove("active");
        blackTemp.remove();
    } else if (e.target.classList.contains("black")) {
        //style and place temp black div
        blackTemp.classList.add("tempBlack");
        document.body.appendChild(blackTemp);
        currentPlayer = "black";
        //toggle player indicators
        black.classList.add("active");
        white.classList.remove("active");
        whiteTemp.remove();
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

//Space deletes tempDiv and places realDiv in the correct column
var whiteFinal;
var blackFinal;
document.addEventListener("keydown", placeCoin);
function placeCoin(e) {
    whiteFinal = document.createElement("div");
    blackFinal = document.createElement("div");
    if (e.keyCode == 32) {
        coins.push(
            new Coin(
                columnIndex,
                coinBelongsTo.childElementCount,
                currentPlayer
            )
        );
        Coin.prototype.createDiv(coinBelongsTo, currentPlayer);
        checkRow(coinBelongsTo.childElementCount - 1);
        checkColumn(columnIndex);
        checkDiagonal(columnIndex, coinBelongsTo.childElementCount - 1);
        ////run through column one position at a time

        //currentPlayer = null;
    }
}

//identify winner

//filter by row, order by column and then look for 4 continuous hits for the same player

function checkRow(row) {
    var rowArr = coins.filter((Coin) => {
        return Coin.row === row;
    });
    var count = 0;
    for (var r = 0; r < rowArr.length; r++) {
        if (rowArr[r].currentPlayer == currentPlayer) {
            count++;
            if (count == 4) {
                console.log(currentPlayer, " wins");
                victory(currentPlayer);
                console.log(rowArr);
            }
        } else count = 0;
    }
}

//filter by column, order by row and then look for 4 continuous hits for the same player
function checkColumn(column) {
    var columnArr = coins.filter((Coin) => {
        return Coin.column === column;
    });
    var count = 0;
    for (var c = 0; c < columnArr.length; c++) {
        if (columnArr[c].currentPlayer == currentPlayer) {
            count++;
            if (count == 4) {
                console.log(currentPlayer, " wins");
                victory(currentPlayer);
                console.log(columnArr);
            }
        } else count = 0;
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
    // 4. Create a loop through all our 42 slots
    // - for each slot calculate the rowIdx (slot.index()) and the colIdx (slot.parent().index()) of that slot
    // IF the sum of that slot matches the sum from step 1 -> push slot to array diag1
    for (var i = 0; i < coins.length; i++) {
        if (coins[i].row + coins[i].column == diagCheck1) {
            diag1.push(coins[i]);
        }
    }
    // IF the diff of that slot matches the diff from step 2 -> push slot to array diag2
    for (var j = 0; j < coins.length; j++) {
        if (coins[j].row - coins[j].column == diagCheck2) {
            diag2.push(coins[j]);
        }
    }
    // 👆 we just created 2 arrays with the slots for the 2 possible winning diagonals
    // now we want to pass those two array to the already existing checkForVictory.
    checkDiag1(diag1);
    function checkDiag1(diag1) {
        var count = 0;
        for (var d1 = 0; d1 < diag1.length; d1++) {
            if (diag1[d1].currentPlayer == currentPlayer) {
                count++;
                if (count == 4) {
                    console.log(currentPlayer, " wins");
                    victory(currentPlayer);
                    console.log(diag1);
                }
            } else count = 0;
        }
    }
    checkDiag2(diag2);
    function checkDiag2(diag2) {
        var count = 0;
        for (var d2 = 0; d2 < diag2.length; d2++) {
            if (diag2[d2].currentPlayer == currentPlayer) {
                count++;
                if (count == 4) {
                    console.log(currentPlayer, " wins");
                    victory(currentPlayer);
                    console.log(diag2);
                }
            } else count = 0;
        }
    }
    // 5. call checkVictory two times with diag1 and diag2 respectively
    // - IF *any* of the checkForVictory calls return true -> return true
    // - IF *none* of the checkForVictory callsr eturn true -> return false
}

function victory(currentPlayer) {
    //do something
    //setTimeout(resetGame, 3000);
}

//reset the game
var btn = document.getElementById("btn");
btn.addEventListener("click", resetGame);
function resetGame() {
    //delete white coins
    var whiteCoins = document.querySelectorAll(".finalWhite");
    for (var i = 0; i < whiteCoins.length; i++) {
        whiteCoins[i].remove();
    }
    //delete black coins
    var blackCoins = document.querySelectorAll(".finalBlack");
    for (var j = 0; j < blackCoins.length; j++) {
        blackCoins[j].remove();
    }
    // empty coins array
    coins = [];
    //remove active class from currentPlayers
    black.classList.remove("active");
    white.classList.remove("active");
    //remove  temp divs
    whiteTemp.remove();
    blackTemp.remove();
}

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
