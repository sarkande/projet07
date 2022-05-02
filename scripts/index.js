
// eslint-disable-next-line no-undef
var app = new App();
app.main();

document.querySelector(".search__module--input").addEventListener("input", (e)=>{
    app.searchByInput(e.target.value.length);
    app.removeMaximizedClass();
});
document.querySelector(".search__module--input").addEventListener("click", ()=>{
    app.removeMaximizedClass();
});

var selection ={
    button: undefined,
    input: undefined,
    list: undefined,
    chevron: undefined,
    search: undefined
};

document.querySelectorAll(".btn").forEach(element =>{
    element.addEventListener("click", (e) => {
        app.removeMaximizedClass();
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
    app.removeMaximizedClass();
});
document.addEventListener("keydown", (event) => {
        
    if (event.key === "Escape") {
        app.removeMaximizedClass();
    }
});
document.querySelector(".fa-chevron-up").addEventListener("click", ()=>{
    app.removeMaximizedClass();
});

document.querySelectorAll(".button__module--input").forEach((selected,index)=>{
    selected.addEventListener("input", (e)=>{
        if(e.target.value.length >2){
            //search
            e.target.parentNode.parentNode.classList.remove("maximized");
            e.target.classList.remove("maximized");
            e.target.classList.add("searchingInput");
            e.target.parentNode.parentNode.querySelector(".button__module--list").classList.remove("maximized");
            selection.search = e.target.parentNode.parentNode.querySelector(".button__module-list-search");
            selection.search.classList.add("maximized");

            //search treatment
            var li = e.target.parentNode.parentNode.querySelectorAll(".button__module--list>ul>li");
            var $wrapperListSearch = e.target.parentNode.parentNode.querySelector(".button__module-list-search > ul");
            $wrapperListSearch.innerHTML="";
            li.forEach((element)=>{
                var type = index === 0 ?"ingredient": index === 1 ? "device":"tool";
                if(element.innerText.includes(e.target.value))
                    $wrapperListSearch.innerHTML+="<li class='search__tags-add "+type+"'>"+element.innerHTML+"</li>";
            });
            app.addEventOnTagsSearch();
            if($wrapperListSearch.innerHTML === ""){
                $wrapperListSearch.append("Aucun resultat");
            }
            
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

});
