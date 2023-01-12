import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../shared/post';
import { RegisterComponent } from '../components/register/register.component';
import { catchError, findIndex, map, tap, Observable, Subject } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  errorSub = new Subject<string>();
  users: Post[] = [];

  constructor(private http: HttpClient) {}

  createAndStorePost(form: any) {
    return this.http
      .post(
        'https://angularapp-f143a-default-rtdb.firebaseio.com/posts.json',
        form
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.errorSub.next(error.Message);
        }
      );
  }

  getfetchPosts(): Observable<Post[]> {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://angularapp-f143a-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((responseData) => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }
          return postArray;
        }),
        catchError((responseError) => {
          return throwError(responseError);
        })
      );
  }
  deleteRequest() {
    return this.http.delete(
      'https://angularapp-f143a-default-rtdb.firebaseio.com/posts.json'
    );
  }
  getPosts(id: string): Observable<Post> {
    return this.http.get<Post>(
      'https://angularapp-f143a-default-rtdb.firebaseio.com/posts/' +
        id +
        '.json'
    );
  }
  getFetchPost(): Observable<Post[]> {
    return this.http.get<Post[]>(
      'https://angularapp-f143a-default-rtdb.firebaseio.com/posts.json'
    );
  }

  updatePost(id: string, form: any) {
    this.http
      .put(
        'https://angularapp-f143a-default-rtdb.firebaseio.com/posts/' +
          id +
          '.json',
        form
      )
      .subscribe();
  }

  getPostById(id: string): Observable<Post> {
    return this.http
      .get<Post>(
        'https://angularapp-f143a-default-rtdb.firebaseio.com/posts/' +
          id +
          '.json'
      )
      .pipe(
        map(
          (b) =>
            <Post>{
              firstname: b?.firstname,
              lastname: b?.lastname,
              email: b?.email,
              mobile: b?.mobile,
            }
        ),
        tap((classicPost) => console.log(classicPost))
      );
  }
}
