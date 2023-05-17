import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { LinkingRecipeStorage } from "./Storage-recipeService.services";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    onFetchData() {
        this.http.get<Recipe[]>('https://recipes-63795-default-rtdb.firebaseio.com/recipes.json').subscribe(
            response => {
                this.recipeService.setRecipes(response);
                console.log(response);
            }
        )
    }
}