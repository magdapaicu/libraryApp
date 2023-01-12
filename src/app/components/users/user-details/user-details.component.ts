import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/post';
import { PostService } from 'src/app/services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogLogoutComponent } from 'src/app/dialog-logout/dialog-logout.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  users: Post[] = [];
  userId!: any;
  user: any;
  data: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('id');
      console.log(this.userId);
    });
    this.loadData();

    //   this.postService.getfetchPosts().subscribe((post: Post[]) => {
    //     this.users = post;
    //     console.log(this.users);
    //     this.user = this.users.find((x) => x.id === this.userId);
    //     console.log(this.user);
    //   });
  }
  loadData() {
    this.postService.getPosts(this.userId).subscribe((user: Post) => {
      this.users.push(user);
      console.log('loadData', user);
    });
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
  goToRegisterPage() {
    this.router.navigate(['app-register']);
  }
}
