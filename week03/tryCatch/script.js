//variables
var textArea = document.getElementById("textArea");
var button = document.getElementById("btn");
var pValid = document.getElementById("valid");
var pNotValid = document.getElementById("notValid");
//grab textArea value to see what user inputted
var textInput = textArea.value;
//listen for click on the button
button.addEventListener("click", testJson);
//when click try stringifying textArea value to JSON
function testJson() {
    textInput = textArea.value;
    try {
        JSON.parse(textInput);
        pValid.style.display = "block";
        pNotValid.style.display = "none";
        //if no error catched, set pValid to display block, and pNotValid to none
    } catch (err) {
        // if error catched, set pNotValid to display block, and pVadlid to none
        pNotValid.style.display = "block";
        pValid.style.display = "none";
    }
}

//ex2

function askForNumber() {
    var num = prompt("Please enter a number between 1 and 10");
    if (num >= 1 && num <= 10 && num == parseInt(num)) {
        return num;
    }
    throw new Error("Bad number");
}
translateNumbertoFinnish();
function translateNumbertoFinnish() {
    try {
        var numberToTranslate = askForNumber();
        if (numberToTranslate == 1) {
            prompt("yksi");
        } else if (numberToTranslate == 2) {
            prompt("kaksi");
        } else if (numberToTranslate == 3) {
            prompt("kolme");
        } else if (numberToTranslate == 4) {
            prompt("neljä");
        } else if (numberToTranslate == 5) {
            prompt("viisi");
        } else if (numberToTranslate == 6) {
            prompt("kuusi");
        } else if (numberToTranslate == 7) {
            prompt("seitsemän");
        } else if (numberToTranslate == 8) {
            prompt("kahdeksan");
        } else if (numberToTranslate == 9) {
            prompt("yhdeksän");
        } else if (numberToTranslate == 10) {
            prompt("kymmenen");
        }
    } catch (err) {
        prompt(err.message);
        translateNumbertoFinnish();
    }
}
