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
const INGREDIENT = "ingredient";
const DEVICE = "device";
const TOOLS = "tool";
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


document.querySelectorAll(".button__module--input").forEach((selected,index)=>{
    selected.addEventListener("input", (e)=>{
        console.log(index);
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
                console.log(element.innerText);
                var type = index === 0 ?"ingredient": index === 1 ? "device":"tool";
                if(element.innerText.includes(e.target.value)){
                    $wrapperListSearch.innerHTML+="<li class='search__tags-add "+type+"'>"+element.innerHTML+"</li>";
                }else{
                    console.log(element.innerText + " not include " + e.target.value);
                }
                    
            });
            addEventOnSearch();
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

document.querySelector(".search__module--input").addEventListener("keydown", (event)=>{
    if (event.key === "Enter") {
        searchByInput();
    }
});
document.querySelector(".search__module--input").addEventListener("input", ()=>{
    searchByInput();
});



//sort recips using input
function searchByInput(){
    var recipes = document.querySelectorAll(".recipe__title--name");

    recipes.forEach((element)=>{
        var valueInput = document.querySelector(".search__module--input").value;
        element.parentElement.parentElement.style.display = "";

        if(!element.innerText.toUpperCase().includes(valueInput.toUpperCase()))
            element.parentElement.parentElement.style.display = "none";
    });
}
// //sort recipes usings tags
// function searchByTags(){
//     throw "error";
// }




function addEventOnSearch(){
    document.querySelectorAll(".search__tags-add").forEach((e)=>{
        e.addEventListener("click", (element)=>{
            var className="";
            if(element.target.classList.contains(INGREDIENT))
                className="search-ingredient";
            else if (element.target.classList.contains(DEVICE))
                className="search-device";
            else if (element.target.classList.contains(TOOLS))
                className="search-tools";
            else
                throw "error";

            var div = document.createElement("div");
            div.innerHTML=element.target.innerHTML + "<i class='fa-regular fa-circle-xmark'></i>";
            div.classList.add("search__tags--element");
            div.classList.add(className);


            document.querySelector(".search__tags").append(div);

            document.querySelectorAll(".fa-circle-xmark").forEach((e)=>{
                e.addEventListener("click", (el)=>{
                    el.target.parentNode.remove();
                });
            });

        });
    });
}

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

