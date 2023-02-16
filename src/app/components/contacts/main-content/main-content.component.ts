import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Book } from 'src/app/shared/book';
import { BookServicesService } from 'src/app/services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { AddReviewDialogComponent } from './add-review-dialog/add-review-dialog.component';
import {
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthService } from '../../login/auth.service';
import { Post } from 'src/app/shared/post';
import { SharedSnack } from 'src/app/shared/shared-snack';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnInit {
  newBookId: any;
  allBook: Book[] = [];
  book: Book;
  color = 'red';
  reviewForm: FormGroup;
  pushReviews: string[] = [];
  newReview: boolean = false;
  currentRate = 6;
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
  filterResult: Post[] = [];
  messageCreateAccount: SharedSnack;
  message: string;
  action: string;
  config: MatSnackBarConfig;
  genders = ['Male', 'Female'];
  reviewText: string;
  getReviews: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookServicesService,
    private http: HttpClient,
    private postService: PostService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.reviewForm = new FormGroup({
      firstReview: new FormControl(null),
      reviews: new FormArray([]),
    });

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.newBookId = params.get('id');
      console.log(this.newBookId);
    });
    this.loadData();
  }

  loadData() {
    this.bookService.getBookById(this.newBookId).subscribe((book: Book) => {
      this.allBook.push(book);
      console.log('Load Data', book);
    });
  }
  changeColor() {
    this.color = 'blue';

    console.log('A fost citita!');
  }
  openDialog() {
    let dialogRef = this.dialog.open(AddReviewDialogComponent, {
      height: '200px',
      width: '400px',
      position: {
        top: '10%',
      },
    });
  }
  getReviewsControl() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.reviewForm.get('reviews')).push(control);
  }
  get reviewsControls() {
    return this.reviewForm.get('reviews') as FormArray;
  }
  renunta(i: any) {
    (<FormArray>this.reviewForm.get('reviews')).removeAt(i);
  }
  goToRegisterPage() {
    this.router.navigate(['app-register']);
  }

  onClickPush(review: any) {
    this.pushReviews.push(review.value);
    console.log(this.pushReviews);
    review.value = '';
    this.color = 'green';
    this.newReview = true;
  }

  // am luat din register

  registerForm = new FormGroup({
    firstname: new FormControl(' ', [Validators.required]),
    lastname: new FormControl(' '),
    email: new FormControl(' ', [Validators.required]),
    mobile: new FormControl(' '),
    gender: new FormControl(' '),
    password: new FormControl(' ', [Validators.required]),
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
    this.openSnackBar('Successfully registered', '');
  }

  get FirstName(): FormControl {
    return this.registerForm.get('firstname') as FormControl;
  }

  get LastName(): FormControl {
    return this.registerForm.get('lastname') as FormControl;
  }

  get Email(): FormControl {
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
  AddReview() {
    this.bookService
      .addReview(this.newBookId, this.reviewText)
      .subscribe(() => {
        this.reviewText = '';
      });
  }
  printReview(bookId: string) {
    this.bookService.getReviews(bookId).subscribe((reviews) => {
      console.log(reviews);
    });
  }
}
