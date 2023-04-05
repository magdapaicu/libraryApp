import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-button',
  templateUrl: './search-button.component.html',
  styleUrls: ['./search-button.component.css'],
})
export class SearchButtonComponent {
  option = 'All';
  genders = ['All', 'Male', 'Female'];
  @Output()
  chooseButton: EventEmitter<string> = new EventEmitter<string>();

  changeButtonSelectedChange() {
    this.chooseButton.emit(this.option);
    // console.log(this.option);
  }
}
