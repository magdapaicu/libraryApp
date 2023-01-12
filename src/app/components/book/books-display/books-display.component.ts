import { Component, Injectable, ViewChild } from '@angular/core';
import { Book } from 'src/app/shared/book';
import { BookServicesService } from 'src/app/services/book.service';
import { HttpClient } from '@angular/common/http';
import { Form, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogLogoutComponent } from 'src/app/dialog-logout/dialog-logout.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-books-display',
  templateUrl: './books-display.component.html',
  styleUrls: ['./books-display.component.css'],
})
@Injectable()
export class BooksDisplayComponent {
  books: Book[] = [];
  editButton: boolean = false;
  idCurrent: any;
  constructor(
    private http: HttpClient,
    private bookService: BookServicesService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  @ViewChild('registerBook') form: NgForm;
  seeBooks: boolean = false;
  message: string = "It's not any books yet!";
  registerBook = new FormGroup({
    title: new FormControl(' '),
    author: new FormControl(' '),
    publishing: new FormControl(' '),
    countPages: new FormControl(' '),
    review: new FormControl(' '),
  });
  ngOnInit(): void {
    this.bookService.getfetchBook().subscribe((book) => {
      this.books = book;
      console.log(this.books);
    });
  }
  onDeleteBook(id: any) {
    this.http
      .delete(
        'https://angularapp-f143a-default-rtdb.firebaseio.com/books/' +
          id +
          '.json'
      )
      .subscribe();
  }
  goToRegisterPage() {
    this.router.navigate(['app-register']);
  }
  goToBookPage() {
    this.router.navigate(['app-book']);
  }
  goToUsersPage() {
    this.router.navigate(['Users']);
  }
  goToContactsPage() {
    this.router.navigate(['app-contacts']);
  }
  goToBookDetailsPage() {
    this.router.navigate(['app-book-display']);
  }
  openDialog() {
    let dialogRef = this.dialog.open(DialogLogoutComponent, {
      height: '200px',
      width: '300px',
      position: {
        top: '10%',
      },
    });
  }
  goToContactPage() {
    this.router.navigate(['Contacts']);
  }
  onUpdateBook(id: any) {
    let updateBook = this.books.find((book) => {
      return book.idBook === id;
    });
    console.log(this.registerBook);
    this.registerBook.patchValue({
      title: updateBook?.title,
      author: updateBook?.author,
      publishing: updateBook?.publishing,
      countPages: updateBook?.countPages,
    });
    console.log(this.registerBook);
  }
  updateBook() {
    this.bookService.updateBook(
      this.idCurrent,
      this.registerBook.getRawValue()
    );
  }
}
