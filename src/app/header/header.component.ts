import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
})

export class HeaderComponent implements OnInit, OnDestroy{
    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService, private authService: AuthService) {}
    myRecipes: Recipe[];
    isAuth = false;
    private userSub: Subscription;
    
    collapsed = true;
    @Output() navigateEvent = new EventEmitter<string>();

    navigate(section: string) {
        this.navigateEvent.emit(section);
    }

    getRecipes() {
        this.dataStorageService.onFetchData();
    }

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuth = !!user;
        })
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

    onLogOut() {
        this.authService.logout();
    }
}