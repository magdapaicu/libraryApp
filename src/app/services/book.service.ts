import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookComponent } from '../components/book/book.component';
import { Book } from '../shared/book';
import { map, mergeMap, Observable, pipe, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookServicesService {
  constructor(private http: HttpClient) {}
  _refresh$ = new Subject<Book[]>();
  refresh = this._refresh$.asObservable();
  bookList: Book[] = [];
  reviewsSubject = new Subject<string[]>();

  createPostBook(form: any) {
    return this.http
      .post(
        'https://angularapp-f143a-default-rtdb.firebaseio.com/books.json',
        form
      )
      .subscribe((book) => console.log(book));
  }

  // delete allBook

  deleteBook(): Observable<Book> {
    return this.http.delete<Book>(
      'https://angularapp-f143a-default-rtdb.firebaseio.com/books.json'
    );
  }

  deleteOneBookService() {}

  getfetchBook(): Observable<Book[]> {
    return this.http
      .get<{ [key: string]: Book }>(
        'https://angularapp-f143a-default-rtdb.firebaseio.com/books.json'
      )
      .pipe(
        map((responseData) => {
          const postArray: Book[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], idBook: key });
            }
          }
          return postArray;
        })
      );
  }

  updateBook(id: any, form: any) {
    const formValue = form.getRawValue();
    this.http
      .put(
        'https://angularapp-f143a-default-rtdb.firebaseio.com/books/' +
          id +
          '.json',
        formValue
      )
      .subscribe();
  }
  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(
      'https://angularapp-f143a-default-rtdb.firebaseio.com/books/' +
        id +
        '.json'
    );
  }
  deleteBookById(id: any): Observable<Book> {
    return this.http.delete<Book>(
      'https://angularapp-f143a-default-rtdb.firebaseio.com/books/' +
        id +
        '.json'
    );
  }
  saveReview(form: any) {
    return this.http
      .post(
        'https://angularapp-f143a-default-rtdb.firebaseio.com/books.json',
        form.value
      )
      .subscribe((book) => console.log(book));
  }
  getFetchBook(): Observable<Book[]> {
    return this.http.get<Book[]>(
      'https://angularapp-f143a-default-rtdb.firebaseio.com/books.json'
    );
  }

  addReview(bookId: string, review: string) {
    return this.http
      .get(
        'https://angularapp-f143a-default-rtdb.firebaseio.com/books/' +
          bookId +
          '.json'
      )
      .pipe(
        mergeMap((book: any) => {
          const updateBook = [...book.review, review];
          return this.http.patch(
            'https://angularapp-f143a-default-rtdb.firebaseio.com/books/' +
              bookId +
              '.json',
            { review: updateBook }
          );
        })
      );
  }
  getReviews(bookId: string) {
    return this.http.get<string[]>(
      'https://angularapp-f143a-default-rtdb.firebaseio.com/books/' +
        bookId +
        '/review.json'
    );
  }
}
