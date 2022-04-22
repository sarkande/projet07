/*
Event on buttons
*/
var selection ={
    button: undefined,
    input: undefined,
    list: undefined,
    chevron: undefined
};

document.querySelectorAll(".btn").forEach(element =>{
    element.addEventListener("click", (e) => {
        closeButtonModule(selection);
        selection.button = e.target.parentNode;
        if(selection.button != undefined)
            selection.button .classList.add("maximized");


        selection.input  = e.target.parentNode.querySelector(".button__module--input");
        if(selection.input != undefined)
            selection.input.classList.add("maximized");


        selection.list = e.target.parentNode.querySelector(".button__module--list");
        if(selection.list != undefined)
            selection.list.classList.add("maximized");


        selection.chevron = e.target.parentNode.querySelector(".fa-chevron-up");
        if(selection.chevron != undefined)
            selection.chevron.classList.add("maximized");

        
    });
});
document.querySelector(".recipesWrapper").addEventListener("click", () => {
    closeButtonModule(selection);
});
document.addEventListener("keydown", (event) => {
        
    if (event.key === "Escape") {
        closeButtonModule(selection);
    }
});
function closeButtonModule(selection){
    if(selection.button != undefined)
        selection.button.classList.remove("maximized");
    if(selection.input != undefined)
        selection.input.classList.remove("maximized");
    if(selection.list != undefined)
        selection.list.classList.remove("maximized");
    if(selection.chevron != undefined)
        selection.chevron.classList.remove("maximized");
}

// eslint-disable-next-line no-undef
var app = new App();
app.main();