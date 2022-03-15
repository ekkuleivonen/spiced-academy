window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    //Resizing the canvas
    //Might want to set this into a function and call upon resize?
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    //Define when pen on the canavs (mouse is state clicked)
    let painting = false; //should start at false

    /* USE ctx to perform draw actions on canvas
    ctx.fillRect(50, 50, 200, 200);
    ctx.beginPath();
    ctx.moveTo(400, 400);
    ctx.lineTo(500, 500);
    ctx.lineTo(500, 550);
    ctx.lineTo(550, 500);
    ctx.stroke();
    */
});
