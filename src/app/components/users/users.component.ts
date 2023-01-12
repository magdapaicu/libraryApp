import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/shared/post';
import { PostService } from 'src/app/services/post.service';
import { DialogLogoutComponent } from 'src/app/dialog-logout/dialog-logout.component';
import { MatDialog } from '@angular/material/dialog';
import { BookServicesService } from 'src/app/services/book.service';
import { Book } from 'src/app/shared/book';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  postDetails: any = new Post();
  postList: Post[] = [];
  dataInitialized: boolean = false;
  postId: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  paramId: string;
  selectedPost: Post;
  verticalPosision: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition;
  delete: DeleteDialogComponent;
  id: any;
  genders = ['Male', 'Female'];

  constructor(
    private router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private postService: PostService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private http: HttpClient,
    private bookService: BookServicesService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}
  allBook: Book[] = [];
  @ViewChild('registerForm') form: NgForm;

  ngOnInit() {
    this.postService.getfetchPosts().subscribe((post: Post[]) => {
      this.postList = post;
      this.dataInitialized = true;
      this._changeDetectorRef.detectChanges();
    });
    this.postService.getfetchPosts().subscribe((post) => {
      this.loadedPosts = post;
      console.log(this.loadedPosts);
    });

    // if (this.delete.delete) {
    //   this.onDeletePost(this.id);
    // }
    // let idParam: string = this.route.snapshot.params['id'];
    // this.postService.getPostById(this.paramId).subscribe((post: Post) => {
    //   console.log(`Numele persoanei este: : ${post.lastname}`);
    // });
    // this.bookService.getfetchBook().subscribe((book: Book[]) => {
    //   this.allBook = book;
    //   console.log(this.allBook);
    // });
    // new metode with stringify()
    // this.postService.getFetchPost().subscribe((posts) => {
    //   this.postList = posts;
    //   console.log(
    //     'This is my object' + JSON.stringify(this.postList, null, ' ')
    //   );
    // });
    // this.postService.getfetchPosts().subscribe((post) => {
    //   this.loadedPosts = post;
    //   console.log(this.loadedPosts);
    // });
  }

  getPost() {}

  // onFetchPosts() {
  //   this.isFetching = true;
  //   this.postService.getfetchPosts().subscribe(
  //     (posts) => {
  //       this.isFetching = false;
  //       this.loadedPosts = posts;
  //     }
  //     // (error) => {
  //     //   this.error = error.message;
  //     //   console.log(error);
  //     // }
  //   );
  // }

  goToMyProfile(id: any) {
    this.router.navigate(['./user-component']);
  }
  goToNextPage(id: any) {
    this.router.navigate(['Users/UserDetails']);
  }
  back() {}
  onClearPosts() {
    // Send Http request
    this.postService.deleteRequest().subscribe(() => {
      this.loadedPosts = [];
    });
  }
  goToRegisterPage() {
    this.router.navigate(['app-register']);
  }
  goToBookPage() {
    this.router.navigate(['app-book']);
  }
  goToUsersPage() {
    this.router.navigate(['Users']);
  }
  goToLoginPage() {
    this.router.navigate(['app-login']);
  }
  goToContactsPage() {
    this.router.navigate(['app-contacts']);
  }
  goToBookDetailsPage() {
    this.router.navigate(['app-book-display']);
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

  openEditDialog() {
    let editDialog = this.dialog.open(EditDialogComponent, {
      height: '600px',
      width: '500px',
      position: {
        top: '10%',
      },
    });
  }
  openDeleteDialog() {
    let editDialog = this.dialog.open(DeleteDialogComponent, {
      height: '200px',
      width: '300px',
      position: {
        top: '10%',
      },
    });
  }

  goToContactPage() {
    this.router.navigate(['Contacts']);
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

  openSnackBar(message: string, action: string) {
    let config: MatSnackBarConfig = new MatSnackBarConfig();
    config.panelClass = ['snackBarPanelClass'];
    config.duration = 2000;
    config.verticalPosition = this.verticalPosision;
    this.snackBar.open(message, action, config);
  }
  clickDeleteIcon() {
    this.openSnackBar('Ati sters acest profil !', 'Delete');
  }
  // onEditPost(id: any) {
  //   // Get the post based on the id
  //   let editPost = this.loadedPosts.find((post) => {
  //     return post.id === id;
  //   });
  //   this.dialogEdit.editBook.patchValue({
  //     name: editPost?.firstname,
  //   });
  // }
  registerForm = new FormGroup({
    firstname: new FormControl(' ', [Validators.required]),
    lastname: new FormControl(' '),
    email: new FormControl(' ', [Validators.required]),
    mobile: new FormControl(' '),
    gender: new FormControl(' '),
    password: new FormControl(' ', [Validators.required]),
    rstpwd: new FormControl(' '),
  });
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
  updateClick() {
    this.postService.updatePost(this.postId, this.registerForm.getRawValue());
    console.log('se apelaza');
  }
}
