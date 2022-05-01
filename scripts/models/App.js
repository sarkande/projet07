/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
class App {
    constructor(){
        this.__ingredient = "ingredient";
        this.__tool = "tool";
        this.__ustensil = "ustensil";

        this._$wrapperRecipes = document.querySelector(".recipesWrapper");
        //ingredients
        this._$wrapperIngredientsFirst = document.querySelectorAll(".button__module--list")[0].querySelectorAll("ul")[0];
        this._$wrapperIngredientsSecond = document.querySelectorAll(".button__module--list")[0].querySelectorAll("ul")[1];
        this._$wrapperIngredientsThird = document.querySelectorAll(".button__module--list")[0].querySelectorAll("ul")[2];

        //tools
        this._$wrapperToolsFirst = document.querySelectorAll(".button__module--list")[1].querySelectorAll("ul")[0];
        this._$wrapperToolsSecond = document.querySelectorAll(".button__module--list")[1].querySelectorAll("ul")[1];
        this._$wrapperToolsThird = document.querySelectorAll(".button__module--list")[1].querySelectorAll("ul")[2];

        //ustensils
        this._$wrapperUstensilsFirst = document.querySelectorAll(".button__module--list")[2].querySelectorAll("ul")[0];
        this._$wrapperUstensilsSecond = document.querySelectorAll(".button__module--list")[2].querySelectorAll("ul")[1];
        this._$wrapperUstensilsThird = document.querySelectorAll(".button__module--list")[2].querySelectorAll("ul")[2];

        this._recipesData = recipesData;
    }
    //base function, call when we need to display all the photographers
    async main() {
        var regexChar = new RegExp(/[^A-zÀ-ú ()']/);

        var ingredients =[];
        var tools =[];
        var ustensils =[];
        this._recipesData.map(recipe => new Recipe(recipe))
            .forEach(e => {
                this._$wrapperRecipes.append(new RecipeCard(e).createTemplate());
                e.ingredients.forEach(element=>{                 
                    ingredients.push(element.ingredient.toLowerCase().replace(regexChar, ""));
                });
                e.ustensils.forEach(element=>{
                    ustensils.push(element.name.toLowerCase());
                });
                tools.push(e.appliance.toLowerCase());
            });

        ingredients = new Set(ingredients);
        tools = new Set(tools);
        ustensils = new Set(ustensils);
        // construction  of list


        this.buildList(ingredients, [this._$wrapperIngredientsFirst,this._$wrapperIngredientsSecond,this._$wrapperIngredientsThird ], this.__ingredient);
        this.buildList(tools, [this._$wrapperToolsFirst,this._$wrapperToolsSecond,this._$wrapperToolsThird ], this.__tool);
        this.buildList(ustensils, [this._$wrapperUstensilsFirst,this._$wrapperUstensilsSecond,this._$wrapperUstensilsThird ], this.__ustensil);
        this.addEventBuildList();


    }

    buildList(array, wrapperArray, type){
        var repartition =1;
        array.forEach(e=>{
            switch(repartition){
            case 1:
                wrapperArray[0].innerHTML += (`<li class='search__tags-add ${type}'>${e}</li>`);
                repartition =2;
                break;
            case 2:
                wrapperArray[1].innerHTML += (`<li class='search__tags-add ${type}'>${e}</li>`);
                repartition=3;
                break;
            case 3:
                wrapperArray[2].innerHTML += (`<li class='search__tags-add ${type}'>${e}</li>`);
                repartition=1;
                break;
            }
        
        });
    }
    addEventBuildList(){
        document.querySelectorAll(".search__tags-add").forEach((e)=>{
            e.addEventListener("click", (element)=>{
                var className="";
                if(element.target.classList.contains(this.__ingredient))
                    className="search-ingredient";
                else if (element.target.classList.contains(this.__tool))
                    className="search-device";
                else if (element.target.classList.contains(this.__ustensil))
                    className="search-tools";
                else
                    throw "error";

                var div = document.createElement("div");
                div.innerHTML=element.target.innerHTML + "<i class='fa-regular fa-circle-xmark'></i>";
                div.classList.add("search__tags--element");
                div.classList.add(className);


                document.querySelector(".search__tags").append(div);
                searchByTags();
                document.querySelectorAll(".fa-circle-xmark").forEach((e)=>{
                    e.addEventListener("click", (el)=>{
                        el.target.parentNode.remove();
                        searchByTags();
                    });
                });

            });
        });
    }
    searchByTags(){
        console.log("search by tag");
        var tagsSearch = document.querySelectorAll(".search__tags--element");
    
        document.querySelectorAll(".tags").forEach((tags, index)=>{
            let arrayTags=[];
            tagsSearch.forEach(element => {
                if(tags.innerText.toUpperCase().trim().includes( element.innerText.toUpperCase().trim()) )
                    arrayTags.push(true);
                else
                    arrayTags.push(false);
            });
            console.log(index, arrayTags);
            console.log(tags.parentElement);
            if(arrayTags.includes(false))
                tags.parentElement.classList.add("tagged");
            else
                tags.parentElement.classList.remove("tagged");
        });
        hideNotSearched();
    }

    
    hideNotSearched(){
        var tagged = document.querySelectorAll(".tagged");
        var searched = document.querySelectorAll(".searched");
        var search__tags = document.querySelectorAll(".search__tags--element");

        console.log(search__tags.length);
        if(tagged.length > 0 && (searched.length > 0 || search__tags.length > 0)){
            //double recherche
            console.log("double recherche");
            document.querySelectorAll(".recipe").forEach((element)=>{
                element.style.display = "none";
                if(element.classList.contains("tagged") && element.classList.contains("searched"))
                    element.style.display = "";
            });
        }
        else if(tagged.length > 0 && searched.length === 0){
            //display only tagged
            console.log("tagged");
            document.querySelectorAll(".recipe").forEach((element)=>{
                element.style.display = "none";
                if(element.classList.contains("tagged"))
                    element.style.display = "";
            });
        }
        else if(tagged.length === 0 && (searched.length > 0 || search__tags.length > 0)){
            //display only searched
            console.log("searched");
            document.querySelectorAll(".recipe").forEach((element)=>{
                element.style.display = "none";
                if(element.classList.contains("searched") && search__tags.length === 0)
                    element.style.display = "";
            });
        }
        else{
            //display all
            console.log("all");
            document.querySelectorAll(".recipe").forEach((element)=>{         
                element.style.display = "";
            });
        }
    
    }
}

