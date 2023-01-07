import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';

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
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;
  // emailExistsAlready = 1;
  fetchData: AuthResponseData[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  config: MatSnackBarConfig;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAu-j3XLcEra7fSzNEX_fwuqZsDMtzIwEY',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  login(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.router.navigate(['/app-book']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  resetPassword(email: string): Promise<any> {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Auth Service: reset password success');
      })
      .catch((error) => {
        console.log('Auth Service: reset password error...');
        console.log(error.code);
        console.log(error);
        if (error.code) return error;
      });
  }

  public handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred !';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        {
          errorMessage = 'This email exists already';
          // this.emailExistsAlready = 0;
        }
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exists. ';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not corect. ';
        break;
    }
    return throwError(errorMessage);
  }
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    // this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  openSnackBar(message: string, action: string) {
    let config: MatSnackBarConfig = new MatSnackBarConfig();
    config.panelClass = ['snackBarPanelClass'];
    config.duration = 2000;
    config.verticalPosition = this.verticalPosition;

    this.snackBar.open(message, action, config);
  }
  fetchLogin() {
    return this.http.get<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAu-j3XLcEra7fSzNEX_fwuqZsDMtzIwEY'
    );
  }
}
