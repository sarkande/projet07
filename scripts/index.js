/*
Event on buttons
*/
var selection ={
    button: undefined,
    input: undefined,
    list: undefined,
    chevron: undefined,
    search: undefined
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
document.querySelector(".fa-chevron-up").addEventListener("click", ()=>{
    closeButtonModule(selection);
});


document.querySelector(".button__module--input").addEventListener("input", (e)=>{
    if(e.target.value.length >2){
        //search
        e.target.parentNode.parentNode.classList.remove("maximized");
        e.target.classList.remove("maximized");
        e.target.classList.add("searchingInput");
        e.target.parentNode.parentNode.querySelector(".button__module--list").classList.remove("maximized");
        selection.search = e.target.parentNode.parentNode.querySelector(".button__module-list-search");
        selection.search.classList.add("maximized");
    }
    else{
        e.target.parentNode.parentNode.classList.add("maximized");
        e.target.classList.add("maximized");
        e.target.classList.remove("searchingInput");
        e.target.parentNode.parentNode.querySelector(".button__module--list").classList.add("maximized");
        e.target.parentNode.parentNode.querySelector(".button__module-list-search").classList.remove("maximized");
        selection.search = undefined;
    }
});



function closeButtonModule(selection){
    if(selection.button != undefined)
        selection.button.classList.remove("maximized");
    if(selection.input != undefined){
        selection.input.classList.remove("maximized");
        selection.input.classList.remove("searchingInput");
    }
    if(selection.list != undefined)
        selection.list.classList.remove("maximized");
    if(selection.chevron != undefined)
        selection.chevron.classList.remove("maximized");

    if(selection.search != undefined)
        selection.search.classList.remove("maximized"); 
}

// eslint-disable-next-line no-undef
var app = new App();
app.main();