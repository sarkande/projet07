// eslint-disable-next-line no-unused-vars
class Ingredient{

    constructor(data) {
        this._ingredient = undefined ?? data.ingredient;
        this._quantity = undefined ?? data.quantity;
        this._unit = undefined ?? data.unit;
    }    

    get ingredient(){
        return this._ingredient;
    }

    get quantity(){
        return this._quantity;
    }

    get unit(){
        return this._unit;
    }
}