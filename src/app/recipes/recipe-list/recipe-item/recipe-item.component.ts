import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
@Input() recipe: Recipe;
@Input() index: number;

constructor(private router: Router, private route: ActivatedRoute) {}

changeRecipe() {
  this.router.navigate([this.index], {relativeTo: this.route})
}
}
