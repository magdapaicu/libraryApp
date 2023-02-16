import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/shared/post';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent {
  person: any;

  constructor(
    private http: HttpClient,
    private postService: PostService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  editPost = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
  });

  populateForm(person: {
    id: any;
    firstname: any;
    lastname: any;
    email: any;
    mobile: any;
  }) {
    this.editPost.patchValue({
      firstname: person.firstname,
      lastname: person.lastname,
      email: person.email,
      mobile: person.mobile,
    });
  }

  ngOnInit() {
    this.person = this.data.personData;
    this.populateForm(this.person);
  }

  updatePost() {
    this.postService.updatePost(this.person.id, this.editPost);
    this.dialogRef.close();
  }
}
