import { HttpClient } from '@angular/common/http';
import {
  Component,
  Injectable,
  Input,
  OnInit,
  ViewChild,
  Inject,
} from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { BookServicesService } from 'src/app/services/book.service';
import { Book } from 'src/app/book';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogLogoutComponent } from 'src/app/dialog-logout/dialog-logout.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
@Injectable()
export class BookComponent implements OnInit {
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

  ngOnInit(): void {
    this.bookService.getfetchBook().subscribe((book) => {
      this.books = book;
    });
  }
  registerBook = new FormGroup({
    title: new FormControl(' '),
    author: new FormControl(' '),
    publishing: new FormControl(' '),
    countPages: new FormControl(' '),
    view: new FormControl(''),
  });

  get Title(): FormControl {
    return this.registerBook.get('title') as FormControl;
  }
  get Autor(): FormControl {
    return this.registerBook.get('author') as FormControl;
  }
  get Publishing(): FormControl {
    return this.registerBook.get('publishing') as FormControl;
  }
  get CountPages(): FormControl {
    return this.registerBook.get('countPages') as FormControl;
  }
  get View(): FormControl {
    return this.registerBook.get('view') as FormControl;
  }
  save() {
    if (!this.editButton)
      this.bookService.createPostBook(this.registerBook.getRawValue());
    else
      this.bookService.updateBook(
        this.idCurrent,
        this.registerBook.getRawValue()
      );
  }

  deleteAllBooks() {
    this.bookService.deleteBook().subscribe((book) => {
      console.log(book);
    });
  }
  giveMeBooks() {
    this.bookService.getfetchBook().subscribe((books) => {
      this.books = books;
      console.log(books);
    });
  }

  isTable() {
    this.seeBooks = true;
  }

  selectedFiles: any = null;

  onDeleteOneBook(id: any) {
    this.http
      .delete(
        'https://angularapp-f143a-default-rtdb.firebaseio.com/books/' +
          id +
          '.json'
      )
      .subscribe();
  }
  onUpdateBook(id: any) {
    let updateBook = this.books.find((book) => {
      return book.idBook === id;
    });
    console.log(this.registerBook);
    // this.registerBook.patchValue({
    //   title: updateBook?.title,
    //   author: updateBook?.author,
    //   publishing: updateBook?.publishing,
    //   countPages: updateBook?.countPages,
    // });
    // console.log(this.registerBook);
  }

  onEditBook(id: any) {
    let updateBook = this.books.find((book) => {
      this.idCurrent = id;
      return book.idBook === id;
    });
    console.log(updateBook);
    this.editButton = true;
    this.registerBook.setValue({
      title: updateBook?.title,
      author: updateBook?.author,
      publishing: updateBook?.publishing,
      countPages: updateBook?.countPages,
      view: updateBook?.view,
    });
  }
  goToNextPage() {
    this.router.navigate(['book-display-component']);
  }
  onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      this.http
        .post('gs://angularapp-f143a.appspot.com', formData)
        .subscribe((res: any) => {
          debugger;
        });
    }
  }
  openDialog() {
    let dialogRef = this.dialog.open(DialogLogoutComponent, {
      height: '200px',
      width: '300px',
      position: {
        top: '10%',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result :${result}`);
    });
  }
  goToRegisterPage() {
    this.router.navigate(['app-register']);
  }
  goToUsersPage() {
    this.router.navigate(['Users']);
  }
  goToContactsPage() {
    this.router.navigate(['app-contacts']);
  }
}
