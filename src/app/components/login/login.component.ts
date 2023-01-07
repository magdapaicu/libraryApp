import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogLogoutComponent } from 'src/app/dialog-logout/dialog-logout.component';
import { Post } from 'src/app/shared/post';
import { PostService } from 'src/app/services/post.service';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { BookServicesService } from 'src/app/services/book.service';
import { Book } from 'src/app/shared/book';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  error: string = '';
  myUserName: string;
  loadedPosts: Post[] = [];
  getFetchLogin: AuthResponseData[] = [];
  firstname: string;
  password: string;
  @Input() firstName: string;
  allBook: Book[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loginForm = new FormGroup({
    firstname: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}
  ngOnInit() {
    // this.authService.fetchLogin().subscribe((data) => {
    //   this.getFetchLogin.push(data);
    //   console.log(this.getFetchLogin);
    // });
  }

  goToRegisterPage() {
    this.router.navigate(['app-register']);
  }
  goToBookPage() {
    this.router.navigate(['app-book']);
  }
  goToContactsPage() {
    this.router.navigate(['app-contacts']);
  }
  goToUsersPage() {
    this.router.navigate(['Users']);
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

  onSubmitButton(form: NgForm) {
    if (!form.value) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    form.reset;

    authObs = this.authService.signup(email, password);
    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.router.navigate(['app-contacts']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );

    // if (this.authService.emailExistsAlready === true) {
    //   this.openSnackBar('This email exists already!', '');
    // }
    // console.log(this.authService.emailExistsAlready);
  }
  openSnackBar(message: string, action: string) {
    let config: MatSnackBarConfig = new MatSnackBarConfig();
    config.panelClass = ['snackBarPanelClass'];
    config.duration = 2000;
    config.verticalPosition = this.verticalPosition;

    this.snackBar.open(message, action, config);
  }
  loginUser(email: string, password: string) {
    this.authService.login(email, password);
  }
}
