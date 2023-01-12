import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BookServicesService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-review-dialog',
  templateUrl: './add-review-dialog.component.html',
  styleUrls: ['./add-review-dialog.component.css'],
})
export class AddReviewDialogComponent {
  constructor(private bookService: BookServicesService) {}
  reviewForm: FormGroup;

  ngOnInit() {
    this.reviewForm = new FormGroup({
      reviews: new FormArray([]),
      textarea: new FormControl(null),
    });
  }

  saveReview() {}
}
