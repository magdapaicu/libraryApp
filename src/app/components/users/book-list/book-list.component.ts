import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BookServicesService } from 'src/app/services/book.service';
import { Book } from 'src/app/shared/book';
import { SelectedBookService } from 'src/app/services/selected-book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {
  booksList: Book[] = [];
  constructor(
    private bookService: BookServicesService,
    private selectedBookService: SelectedBookService,
    private http: HttpClient
  ) {}

  selectedBooks: any[] = [];
  book: Book;
  input1: string;
  input2: string;
  input3: string;

  ngOnInit() {
    this.bookService.getfetchBook().subscribe((book: Book[]) => {
      this.booksList = book;
    });
    this.booksList = this.booksList.map((book) => {
      return { ...book, selected: false };
    });
  }

  onCheckBoxChange(book: Book) {
    book.selected = !book.selected;
    if (book.selected) {
      this.selectedBooks.push(book);
    } else {
      const index = this.selectedBooks.indexOf(book);
      this.selectedBooks.splice(index, 1);
    }
  }
  save() {
    for (let book of this.selectedBooks) {
      console.log(book);
    }
  }

  updateBook(book: Book) {
    this.http
      .put(
        'https://angularapp-f143a-default-rtdb.firebaseio.com/books/' +
          book.idBook +
          '.json',
        book
      )
      .subscribe();
  }

  filterTitle(event: string) {
    this.booksList = this.booksList.filter((book) => {
      return book.title.includes(event);
    });
    console.log(this.booksList);
  }

  filterAuthor(event: string) {
    this.booksList = this.booksList.filter((book) => {
      return book.author.includes(event);
    });
  }

  filterPublishing(event: string) {
    this.booksList = this.booksList.filter((book) => {
      return book.publishing.includes(event);
    });
  }

  clickAll() {
    this.bookService.getfetchBook().subscribe((book: Book[]) => {
      this.booksList = book;
      this.input1 = '';
      this.input2 = '';
      this.input3 = '';
    });
  }
  onSelect(book: Book) {
    this.selectedBookService.addBook(book);
    let selectedBooks = this.selectedBookService.getSelectedBook();
  }
}
