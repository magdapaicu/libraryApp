import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookServicesService } from 'src/app/services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-edit-dialog-book',
  templateUrl: './edit-dialog-book.component.html',
  styleUrls: ['./edit-dialog-book.component.css'],
})
export class EditDialogBookComponent {
  constructor(
    private bookService: BookServicesService,
    private editSnack: MatSnackBar,
    public dialogRef: MatDialogRef<EditDialogBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  book: any;

  registerBook = new FormGroup({
    title: new FormControl(' '),
    author: new FormControl(' '),
    publishing: new FormControl(' '),
    countPages: new FormControl(' '),
    review: new FormControl(' '),
    type: new FormControl(' '),
  });

  cancel() {
    this.registerBook.patchValue({
      title: '',
      author: '',
      publishing: '',
      countPages: '',
      review: '',
    });
  }
  pupulateForm(book: {
    title: any;
    idBook: any;
    author: any;
    publishing: any;
    countPages: any;
    review: any;
  }) {
    this.registerBook.patchValue({
      title: book.title,
      author: book.author,
      publishing: book.publishing,
      countPages: book.countPages,
      review: book.review,
    });
  }

  ngOnInit() {
    this.book = this.data.bookData;
    this.pupulateForm(this.book);
  }
  updateBook() {
    this.bookService.updateBook(this.data.idBook, this.registerBook);
    this.dialogRef.close();
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.verticalPosition = 'top';
    config.panelClass = ['.mat-mdc-snack-bar-container'];
    this.editSnack.open('Successfully Updated ! ', '', config);
  }
}
