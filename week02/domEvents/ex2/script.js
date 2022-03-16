(function () {
    /*
Make a page that has a <textarea> element on it.
As the user types visible characters into this field, the characters should be replaced with the characters in the corresponding position in the Gettysburg Address.
(Note - you can get and set the text in a <textarea> through its value property.)
*/

    //Input text into a string
    var str =
        "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this. But, in a larger sense, we can not dedicate -- we can not consecrate -- we can not hallow -- this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us -- that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion -- that we here highly resolve that these dead shall not have died in vain -- that this nation, under God, shall have a new birth of freedom -- and that government of the people, by the people, for the people, shall not perish from the earth.";
    //Save text in an array
    var hiddenText = Array.from(str);
    //Get and save textinput field
    var textArea = document.getElementById("textArea");
    //Listen when a letter is passed to textArea
    textArea.addEventListener("keydown", replaceChar);
    // Declare charIndex
    var charIndex = 0;
    //main function
    function replaceChar(e) {
        if (!(charIndex >= hiddenText.length)) {
            //check if srting is out ot characters
            if (!(e.keyCode === 8)) {
                //check if keydown is delete
                console.log("is not backspace");
                //prevent typed char
                e.preventDefault();
                //append replaced char
                e.target.value += hiddenText[charIndex];
                //Increase char index by one
                charIndex++;
            } else {
                console.log("is backspace");
                charIndex--;
            }
        } else {
            charIndex = 0;
        }
    }
})();

//INPUT INSTEAD O KEY DOWN

// VBALUE SITEAD OF APPENND
