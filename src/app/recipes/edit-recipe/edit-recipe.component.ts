import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit{
  editMode = false;
  id: number;
  myForm: FormGroup;
  myRecipe: Recipe;
  recipeName = "";
  recipeImage = "";
  recipeDesc = "";

  constructor(private router: ActivatedRoute, private recipe: RecipeService, private route: Router) {}

  ngOnInit(): void {
    this.router.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = this.id == null ? false : true;
          this.initializeForm();
        }
      );
  }

  private initializeForm() {
    if (this.editMode) {
      this.myRecipe = this.recipe.recipeById(this.id);
      this.recipeName = this.myRecipe.name;
      this.recipeImage = this.myRecipe.imagePath;
      this.recipeDesc = this.myRecipe.description;
    }
    

    this.myForm = new FormGroup({
      'name': new FormControl(this.recipeName, Validators.required),
      'description': new FormControl(this.recipeDesc, Validators.required),
      'imagePath': new FormControl(this.recipeImage, Validators.required),
      'ingredients': new FormArray([])
    })

    if (this.editMode && this.myRecipe.ingredients) {
      for(let ingredient of this.myRecipe.ingredients) {
        (<FormArray>this.myForm.get('ingredients')).push(
          new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, Validators.required)
          })
        )
      }
    }
  }

  addIngredient() {
    (<FormArray>this.myForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, Validators.required)
      })
    )
  }

  getIngredients() {
    return (<FormArray>this.myForm.get('ingredients')).controls;
  }

  onSubmit() {
    let newRecipe: Recipe = this.myForm.value;

    if (this.editMode) {
      this.recipe.updateRecipe(this.id, newRecipe);
    } else {
      this.recipe.addRecipe(newRecipe);
    }

    this.cancel();
  }

  cancel() {
    this.route.navigate(["../"], {relativeTo: this.router});
  }

  deleteIngredient(index: number) {
    (<FormArray>this.myForm.get('ingredients')).removeAt(index);
  }
}
