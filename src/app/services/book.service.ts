import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookComponent } from '../components/book/book.component';
import { Book } from '../shared/book';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookServicesService {
  constructor(private http: HttpClient) {}
  private id: string;

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

  updateBook(id: string, form: any) {
    this.http
      .put(
        'https://angularapp-f143a-default-rtdb.firebaseio.com/books/' +
          id +
          '.json',
        form
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
  deleteBookById(id: any) {
    this.http
      .delete(
        'https://angularapp-f143a-default-rtdb.firebaseio.com/books/' +
          id +
          '.json'
      )
      .subscribe();
  }
}
