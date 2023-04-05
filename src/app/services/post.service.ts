import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../shared/post';
import { catchError, map, Observable, Subject } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  errorSub = new Subject<string>();
  users: Post[] = [];
  _refresh$ = new Subject<Post[]>();
  refresh = this._refresh$.asObservable();

  constructor(private http: HttpClient) {}

  postList: Post[] = [];

  // deletePost(postId: any) {
  //   this.postList = this.postList.filter((post) => post.id !== postId);
  //   this._refresh$.next(this.postList);
  // }

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

  onDeletePost(id: any): Observable<Post> {
    return this.http.delete<Post>(
      'https://angularapp-f143a-default-rtdb.firebaseio.com/posts/' +
        id +
        '.json'
    );
  }

  updatePost(id: any, form: any) {
    const formValue = form.getRawValue();
    this.http
      .put(
        'https://angularapp-f143a-default-rtdb.firebaseio.com/posts/' +
          id +
          '.json',
        formValue
      )
      .subscribe();
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(
      'https://angularapp-f143a-default-rtdb.firebaseio.com/posts/' +
        id +
        '.json'
    );
  }
}
