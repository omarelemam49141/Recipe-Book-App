import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Cucumbers', 10),
        new Ingredient('Turnips', 6)
    ];

    addIngredientsEvent = new Subject<Ingredient[]>();

    ingredientEdit = new Subject<Ingredient>();

    getIngredients() {
        return this.ingredients;
    }

    addIngredientService(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
    }

    getSingleIngredient(id: number) {
        return this.ingredients[id];
    }

    updateIngredient(id: number, name: string, amount: number) {
        this.ingredients[id].name = name;
        this.ingredients[id].amount = amount;    
    }

    deleteIngredient(id: number) {
        this.ingredients.splice(id, 1);
    }
}