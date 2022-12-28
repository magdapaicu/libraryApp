import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  ɵflushModuleScopingQueueAsMuchAsPossible,
} from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { stringLength } from '@firebase/util';

export class AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAu-j3XLcEra7fSzNEX_fwuqZsDMtzIwEY',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  login(email: string, password: string) {
    this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAu-j3XLcEra7fSzNEX_fwuqZsDMtzIwEY',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
