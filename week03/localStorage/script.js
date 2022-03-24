//variables
var textArea = document.getElementById("textarea");
var textInput;

//save written text in variable (update with this variable every time user presses a key)
textArea.addEventListener("keydown", saveChange);

function saveChange() {
    textInput = textArea.value;
    console.log(textInput);
    localStorage.setItem("localText", textInput);
}

//read from the local storage upon page load
textArea.value = localStorage.getItem("localText");
