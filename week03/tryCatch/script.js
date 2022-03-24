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
