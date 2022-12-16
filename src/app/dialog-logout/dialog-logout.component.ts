import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-logout',
  templateUrl: './dialog-logout.component.html',
  styleUrls: ['./dialog-logout.component.css'],
})
export class DialogLogoutComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogLogoutComponent>,
    private router: Router
  ) {}
  ngOnInit() {
    this.dialogRef.updatePosition({
      left: `50rem`,
    });
  }
  goToLoginPage() {
    this.router.navigate(['app-login']);
  }
}
