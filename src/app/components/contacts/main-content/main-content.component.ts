import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Book } from 'src/app/book';
import { BookServicesService } from 'src/app/services/book.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnInit {
  newBookId!: any;
  allBook: Book[] = [];
  book: Book;
  color = 'gray';

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookServicesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.newBookId = params.get('id');
      console.log(this.newBookId);
    });
    this.loadData();
  }
  loadData() {
    this.bookService.getBookById(this.newBookId).subscribe((book: Book) => {
      this.allBook.push(book);
      console.log('Load Data', book);
    });
  }
  changeColor() {
    this.color = 'blue';

    console.log('A fost citita!');
  }
}
