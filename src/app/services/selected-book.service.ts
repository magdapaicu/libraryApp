import { Injectable } from '@angular/core';
import { Book } from '../shared/book';

@Injectable({
  providedIn: 'root',
})
export class SelectedBookService {
  selectedBook: Book[] = [];

  constructor() {}

  addBook(book: Book) {
    if (book) {
      this.selectedBook.push(book);
    }
  }
  getSelectedBook() {
    return this.selectedBook;
  }
}
