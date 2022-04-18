/*
Event on buttons
*/
var buttonSelected;
var inputSelected;
var listSelected;

document.querySelectorAll(".btn").forEach(element =>{
    element.addEventListener("click", (e) => {
        if(buttonSelected != undefined)
            buttonSelected.classList.remove("maximized");
        if(inputSelected != undefined)
            inputSelected.classList.remove("maximized");
        if(listSelected != undefined)
            listSelected.classList.remove("maximized");
        buttonSelected = e.target.parentNode;
        buttonSelected.classList.add("maximized");
        inputSelected = e.target.parentNode.querySelector(".button__module--input");
        inputSelected.classList.add("maximized");
        listSelected = e.target.parentNode.querySelector(".button__module--list");
        listSelected.classList.add("maximized");
    });
});

document.addEventListener("keydown", (event) => {
        
    if (event.key === "Escape") {
        if(buttonSelected != undefined)
            buttonSelected.classList.remove("maximized");
        if(inputSelected != undefined)
            inputSelected.classList.remove("maximized");
        if(listSelected != undefined)
            listSelected.classList.remove("maximized");
    }
});

// eslint-disable-next-line no-undef
var app = new App();
app.main();