import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogLogoutComponent } from 'src/app/dialog-logout/dialog-logout.component';
import { Post } from 'src/app/post';
import { PostService } from 'src/app/services/post.service';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { BookServicesService } from 'src/app/services/book.service';
import { Book } from 'src/app/book';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private postService: PostService,
    private bookService: BookServicesService
  ) {}
  ngOnInit() {
    this.postService.getfetchPosts().subscribe((post: Post[]) => {
      this.loadedPosts = post;
      console.log(this.loadedPosts);
    });
    this.bookService.getfetchBook().subscribe((book: Book[]) => {
      this.allBook = book;
      console.log(this.allBook);
    });
  }
  myUserName: string;
  loginForm = new FormGroup({
    firstname: new FormControl(''),
    password: new FormControl(''),
  });
  loadedPosts: Post[] = [];
  firstname: string;
  password: string;
  @Input() firstName: string;
  allBook: Book[] = [];

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

  loginButton() {
    this.myUserName = (<HTMLInputElement>(
      document.getElementById('firstname')
    )).value;
    if (this.myUserName === 'adm') {
      this.goToUsersPage();
    } else {
      this.goToContactsPage();
    }
  }
}
