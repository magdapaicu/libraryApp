import { Component, EventEmitter, Output } from '@angular/core';
import { DialogLogoutComponent } from 'src/app/dialog-logout/dialog-logout.component';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AddNewBookDilogComponent } from 'src/app/add-new-book-dilog/add-new-book-dilog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(
    private http: HttpClient,
    private postService: PostService,
    private router: Router,
    public dialog1: MatDialog,
    public dialog2: MatDialog
  ) {}

  ngOnInit() {}
  openDialog() {
    let dialogRef1 = this.dialog1.open(DialogLogoutComponent, {
      height: '200px',
      width: '300px',
      position: {
        top: '10%',
      },
    });
    dialogRef1.afterClosed().subscribe((result) => {
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
  openAddBookDialog() {
    let dialogRef2 = this.dialog2.open(AddNewBookDilogComponent, {
      height: '600px',
      width: '500px',
      position: {
        top: '10%',
      },
    });
    dialogRef2.afterClosed().subscribe((result) => {
      console.log('Dialogul s-a inchis !');
    });
  }
  goToContactPage() {
    this.router.navigate(['Contacts']);
  }
}
