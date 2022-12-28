import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/shared/post';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogLogoutComponent } from 'src/app/dialog-logout/dialog-logout.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SharedSnack } from 'src/app/shared/shared-snack';
import { MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from '../login/auth.service';
import { stringLength } from '@firebase/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
@Injectable()
export class RegisterComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private postService: PostService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  @ViewChild('registerForm') form: NgForm;
  filteredPosts: Post[];
  _filterText: string = '';
  singleClick: boolean = false;
  wasClicked = true;
  messageCreateAccount: SharedSnack;
  message: string;
  action: string;
  config: MatSnackBarConfig;

  @Output() isActiveChange: EventEmitter<boolean>;
  ngOnInit() {
    this.isFetching = true;
    this.postService.getfetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
        console.log(posts);
      },
      (error) => {
        this.error = error.message;
      }
    );

    this.filteredPosts = this.loadedPosts;
  }

  registerForm = new FormGroup({
    firstname: new FormControl(' ', [Validators.required]),
    lastname: new FormControl(' '),
    email: new FormControl(' '),
    mobile: new FormControl(' '),
    gender: new FormControl(' '),
    password: new FormControl(' '),
    rstpwd: new FormControl(' '),
  });

  set filterText(value: string) {
    this._filterText = value;
    this.loadedPosts = this.onFilterPostByName(value);
  }

  registerSubmited() {
    this.postService.createAndStorePost(this.registerForm.getRawValue());
    this.registerForm.patchValue({
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      password: '',
      rstpwd: '',
    });

    // Send Http request

    // this.http
    //   .post<{ name: string }>(
    //     'https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
    //    // this.registerForm.getRawValue()
    //   )
    //   .subscribe((responseData) => {
    //     console.log(responseData);
    //   });
    // const messageCreateAccount: SharedSnack = {
    //   title: 'x',
    //   duration: 2000,
    //   horizontalPosition: 'center',
    //   verticalPosition: 'bottom',
    //   description: 'd',
    // };
    this.openSnackBar('Successfully registered', ':))');
  }

  get FirstName(): FormControl {
    return this.registerForm.get('firstname') as FormControl;
  }

  get LastName(): FormControl {
    return this.registerForm.get('lastname') as FormControl;
  }

  get Emai(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get Mobile(): FormControl {
    return this.registerForm.get('mobile') as FormControl;
  }

  get Gender(): FormControl {
    return this.registerForm.get('gender') as FormControl;
  }

  get Password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get ResetPassword(): FormControl {
    return this.registerForm.get('rstpwd') as FormControl;
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.getfetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }
      // (error) => {
      //   this.error = error.message;
      //   console.log(error);
      // }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postService.deleteRequest().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onDeletePost(id: any) {
    this.http
      .delete(
        'https://angularapp-f143a-default-rtdb.firebaseio.com/posts/' +
          id +
          '.json'
      )
      .subscribe();
  }

  onEditPost(id: any) {
    // Get the post based on the id
    let editPost = this.loadedPosts.find((post) => {
      return post.id === id;
    });
    console.log(editPost);

    this.registerForm.patchValue({
      firstname: editPost?.firstname,
      lastname: editPost?.lastname,
      email: editPost?.email,
      mobile: editPost?.mobile,
      gender: editPost?.gender,
      password: editPost?.password,
      rstpwd: editPost?.rstpwd,
    });
    console.log(this.registerForm);
  }

  onFilterPostByName(filterTerm: string) {
    if (this.loadedPosts.length === 0 || this.filterText === '') {
      return this.loadedPosts;
    } else {
      return this.loadedPosts.filter((posts) => {
        return posts.firstname === filterTerm;
      });
    }
  }

  goToNextPage() {
    this.router.navigate(['/users-component']);
  }
  openDialog() {
    this.wasClicked = true;
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

  isDirectoryPath() {
    return this.router.isActive('directory', false);
  }
  openSnackBar(message: string, action: string) {
    let config: MatSnackBarConfig = new MatSnackBarConfig();
    config.panelClass = ['snackBarPanelClass'];
    config.duration = 2000;
    config.verticalPosition = this.verticalPosition;

    this.snackBar.open(message, action, config);
  }
  goToContactPage() {
    this.router.navigate(['Contacts']);
  }
  goToLoginPage() {
    this.router.navigate(['app-login']);
  }
  onSubmitLogin(form: any) {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    this.authService.signup(email!, password!).subscribe(
      (respData) => {
        console.log(respData);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
