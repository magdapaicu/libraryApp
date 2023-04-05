import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BookServicesService } from '../../../services/book.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-new-book-dilog',
  templateUrl: './add-new-book-dilog.component.html',
  styleUrls: ['./add-new-book-dilog.component.css'],
})
export class AddNewBookDilogComponent {
  constructor(
    private bookService: BookServicesService,
    private dialogRef: MatDialogRef<AddNewBookDilogComponent>
  ) {}
  editButton: boolean = false;
  registerBook = new FormGroup({
    title: new FormControl(' '),
    author: new FormControl(' '),
    publishing: new FormControl(' '),
    countPages: new FormControl(' '),
    type: new FormControl(' '),
    review: new FormControl(' '),
  });
  ngOnInit() {}
  save() {
    this.bookService.createPostBook(this.registerBook.getRawValue());
    this.dialogRef.close();
  }
  cancel() {
    this.registerBook.patchValue({
      title: '',
      author: '',
      publishing: '',
      countPages: '',
      review: '',
    });
  }
}
