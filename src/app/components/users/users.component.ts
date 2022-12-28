import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/shared/post';
import { PostService } from 'src/app/services/post.service';
import { DialogLogoutComponent } from 'src/app/dialog-logout/dialog-logout.component';
import { MatDialog } from '@angular/material/dialog';
import { BookServicesService } from 'src/app/services/book.service';
import { Book } from 'src/app/shared/book';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  loadedPosts: Post[];
  isFetching = false;
  error = null;
  postDetails: any = new Post();
  postList: Post[] = [];
  dataInitialized: boolean = false;
  postId!: number;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  paramId: string;
  selectedPost: Post;

  constructor(
    private router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private postService: PostService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private http: HttpClient,
    private bookService: BookServicesService
  ) {}
  allBook: Book[] = [];

  ngOnInit() {
    this.postService.getfetchPosts().subscribe((post: Post[]) => {
      this.postList = post;
      this.dataInitialized = true;
      this._changeDetectorRef.detectChanges();
    });

    let idParam: string = this.route.snapshot.params['id'];
    this.postService.getPostById(this.paramId).subscribe((post: Post) => {
      console.log(`Numele persoanei este: : ${post.lastname}`);
    });
    this.bookService.getfetchBook().subscribe((book: Book[]) => {
      this.allBook = book;
      console.log(this.allBook);
    });
    // new metode with stringify()
    // this.postService.getFetchPost().subscribe((posts) => {
    //   this.postList = posts;
    //   console.log(
    //     'This is my object' + JSON.stringify(this.postList, null, ' ')
    //   );
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
  goToContactsPage() {
    this.router.navigate(['app-contacts']);
  }
  goToBookDetailsPage() {
    this.router.navigate(['app-book-display']);
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
}
