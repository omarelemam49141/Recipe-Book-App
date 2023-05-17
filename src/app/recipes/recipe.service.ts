import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class RecipeService {
    private recipes: Recipe[] = [];

    recipeEvent = new EventEmitter<Recipe>();

    recipesChanged = new Subject<Recipe[]>();

    getRecipe() {
        return this.recipes.slice();
    }

    recipeById(id: number) {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
        this.pushDataToServer(this.getRecipe());
    }

    constructor(private shoppingService: ShoppingListService, private http: HttpClient, private route: Router) {}

    addToShoppingList(ingredients: Ingredient[]) {
        this.shoppingService.addIngredients(ingredients);
    }

    updateRecipe(id: number, recipe: Recipe) {
        this.recipes[id] = recipe;
        this.recipesChanged.next(this.recipes.slice());
        this.pushDataToServer(this.getRecipe());
    }

    deleteRecipe(id: number) {
        this.recipes.splice(id, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    pushDataToServer(recipes: Recipe[]) {
        this.http.put('https://recipes-63795-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(
            rs => {
                console.log(rs);
            }
        );
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
        this.route.navigate(['recipes']);
    }
}