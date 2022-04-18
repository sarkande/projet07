/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
class App {
     
    constructor(){
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
        var regexChar = new RegExp(/[^A-zÀ-ú ]/);

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


        this.buildList(ingredients, [this._$wrapperIngredientsFirst,this._$wrapperIngredientsSecond,this._$wrapperIngredientsThird ]);
        this.buildList(tools, [this._$wrapperToolsFirst,this._$wrapperToolsSecond,this._$wrapperToolsThird ]);
        this.buildList(ustensils, [this._$wrapperUstensilsFirst,this._$wrapperUstensilsSecond,this._$wrapperUstensilsThird ]);

    }

    buildList(array, wrapperArray){
        var repartition =1;
        array.forEach(e=>{
            switch(repartition){
            case 1:
                wrapperArray[0].innerHTML += (`<li>${e}</li>`);
                repartition =2;
                break;
            case 2:
                wrapperArray[1].innerHTML += (`<li>${e}</li>`);
                repartition=3;
                break;
            case 3:
                wrapperArray[2].innerHTML += (`<li>${e}</li>`);
                repartition=1;
                break;
            }
        
        });
    }
}