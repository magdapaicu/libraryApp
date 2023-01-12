import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/shared/post';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent {
  constructor(private http: HttpClient, private postService: PostService) {}
  editBook = new FormGroup({
    name: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
  });
  loadedPosts: Post[] = [];
  ngOnInit() {
    this.postService.getfetchPosts().subscribe((post) => {
      this.loadedPosts = post;
      console.log(this.loadedPosts);
    });
  }

  onEditPost(id: any) {
    let editPost = this.loadedPosts.find((post) => {
      post.id == id;
      console.log(editPost);
    });
  }
}
