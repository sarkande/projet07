// eslint-disable-next-line no-unused-vars
class RecipeCard{
    constructor(recipe){
        this._recipe = recipe;
    }
    createTemplate(){
        const $wrapper = document.createElement("div");
        $wrapper.classList.add("recipe");

        var ingredientsList = "";


        for (let index = 0; index < this._recipe.ingredients.length; index++) {
            const element = this._recipe.ingredients[index];
            ingredientsList+="<li class='recipe__list--element'>";
            ingredientsList+=element.ingredient;
            if(element.quantity != undefined)
                ingredientsList+=": "+element.quantity;
            if(element.unit != undefined)
                ingredientsList+=" "+element.unit;
            ingredientsList+="</li>";
        }

        const recipeCard =`
        <div class="recipe__img"></div>
            <h2 class="recipe__title">
                <span class="recipe__title--name">${this._recipe.name}</span>
                <span class="recipe__title--timer"><i class="fa-regular fa-clock"></i> ${this._recipe.time} min</span>
            </h2>
            <ul class="recipe__list">
                ${ingredientsList}
            </ul>
            <p class="recipe__descr">
            ${this._recipe.description}
            </p>
            <div class="tags">${this._recipe.toString()}</div>
        </div>
        `;
        $wrapper.innerHTML = recipeCard;
        return $wrapper; 
    }
}