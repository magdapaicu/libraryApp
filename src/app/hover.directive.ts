import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onmouseover() {
    this.renderer.setStyle(this.element.nativeElement, 'transition', '0.5s');
    this.renderer.setStyle(this.element.nativeElement, 'color', '#eb7f7f');
  }

  @HostListener('mouseleave') onmouseout() {
    this.renderer.setStyle(this.element.nativeElement, 'transition', '0.5s');
    this.renderer.setStyle(this.element.nativeElement, 'color', ' #db1212');
  }
}
