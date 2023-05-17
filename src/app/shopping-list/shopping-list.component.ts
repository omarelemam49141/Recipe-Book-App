import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
  ingredients: Ingredient[];
  addedIngredients: Ingredient[];
  editedIngredient: Ingredient;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.shoppingService.addIngredientsEvent.subscribe(
      (ingredients: Ingredient[]) => {
        this.addedIngredients = ingredients;
        this.ingredients.push(...this.addedIngredients);
      }
    )
  }

  editIngredient(index: number) {
    this.editedIngredient = this.shoppingService.getSingleIngredient(index);
    this.shoppingService.ingredientEdit.next(this.editedIngredient);
  }
}
