import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  name: string;
  amount: number;
  newIngredient: Ingredient;
  editedIngredient: Ingredient;
  editMode = false;
  allIngredients: Ingredient[];
  editedIngredientIndex: number;

  @ViewChild('f', {static: false}) myForm: NgForm; 

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingService.ingredientEdit
      .subscribe(ingredient => {
        this.editedIngredient = ingredient;
        this.myForm.setValue({
          'name': ingredient.name,
          'amount': ingredient.amount
        })

        this.editMode = true;
      })
  }


  submitIngredient(form: NgForm) {
    this.name = form.value.name;
    this.amount = form.value.amount;

    if(this.editMode) {
      this.allIngredients = this.shoppingService.getIngredients();
      this.editedIngredientIndex = this.allIngredients.indexOf(this.editedIngredient);
      this.shoppingService.updateIngredient(this.editedIngredientIndex, this.name, this.amount);
      form.reset();
      this.editMode = false;
    } else {
      this.newIngredient = new Ingredient(this.name, this.amount);
      this.shoppingService.addIngredientService(this.newIngredient);
    }
  }

  resetForm() {
    this.myForm.reset();
  }

  deleteMyIngredient() {
    this.shoppingService.deleteIngredient(this.editedIngredientIndex);
    this.resetForm();
    this.editMode = false;
  }
}