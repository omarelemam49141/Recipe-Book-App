import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/authGuard.guard";
import { EditRecipeComponent } from "./recipes/edit-recipe/edit-recipe.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "./Recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoute: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: "full"},
    {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children:[
        {path: '', component: RecipeStartComponent},
        {path: 'new', component: EditRecipeComponent},
        {path: ':id', component: RecipeDetailComponent},
        {path: ':id/edit', component: EditRecipeComponent},
    ]},
    {path: 'shopping-list', component: ShoppingListComponent},
    {path: 'auth', component: AuthComponent},
    {path: '**', redirectTo:'/recipes'}
    
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoute)
    ],
    exports: [RouterModule]
})

export class AppRouting{

}