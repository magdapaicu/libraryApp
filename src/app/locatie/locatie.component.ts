import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogLogoutComponent } from '../dialog-logout/dialog-logout.component';

@Component({
  selector: 'app-locatie',
  templateUrl: './locatie.component.html',
  styleUrls: ['./locatie.component.css'],
})
export class LocatieComponent {
  constructor(private router: Router, private dialog: MatDialog) {}
  ngOnInit() {}
  goToRegisterPage() {
    this.router.navigate(['app-register']);
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
  }
  goToContactPage() {
    this.router.navigate(['Contacts']);
  }
}
