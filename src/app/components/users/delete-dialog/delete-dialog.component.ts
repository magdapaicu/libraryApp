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
  delete: boolean = false;
  yes: UsersComponent;
  onDeletePost(id: any) {
    this.http
      .delete(
        'https://angularapp-f143a-default-rtdb.firebaseio.com/posts/' +
          id +
          '.json'
      )
      .subscribe();
  }
  checkTrue() {
    this.delete = true;
  }
}
