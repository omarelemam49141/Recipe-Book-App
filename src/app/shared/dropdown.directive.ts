import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropDown]'
})

export class DropDown {
    @HostBinding('class.show') isOpen = false;

    @HostListener('click') toggler() {
        this.isOpen = !this.isOpen;
    }
}