import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UsersComponent } from '../users.component';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent {
  constructor(private http: HttpClient) {}
  deletePost: boolean = false;
  changeDelete() {
    this.deletePost = true;
    console.log(this.deletePost);
  }
}
