import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  constructor(private http: HttpClient) {}

  getUser(id: string) {
    return this.http
      .get(
        'https://angularapp-f143a-default-rtdb.firebaseio.com/posts' +
          id +
          '.json'
      )
      .subscribe();
  }
}
