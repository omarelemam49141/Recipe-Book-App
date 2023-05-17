import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class LinkingRecipeStorage {
    constructor(private recipeService: RecipeService) {}

    onPassingRecipes(recipes: Recipe[]) {
        this.recipeService.setRecipes(recipes);
    }
}