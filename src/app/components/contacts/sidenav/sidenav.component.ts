import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Book } from 'src/app/book';
import { BookServicesService } from 'src/app/services/book.service';

const SMAL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  public isScreenSmall: boolean;
  books: Book[] = [];
  color = 'gray';
  breakpointObserver: any;
  @ViewChild('sidenav') sidenav: ElementRef;
  constructor(
    breakpointObserver: BreakpointObserver,
    private http: HttpClient,
    private bookService: BookServicesService
  ) {}

  ngOnInit() {
    this.onFetchBooks();
    // this.breakpointObserver
    //   .observe([`(max-width:${SMAL_WIDTH_BREAKPOINT}px)`])
    //   .subscribe((state: BreakpointState) => {
    //     this.isScreenSmall = state.matches;
    //   });
  }

  onFetchBooks() {
    this.bookService.getfetchBook().subscribe((book) => {
      this.books = book;
      console.log(this.books);
    });
  }
  clickBook() {
    this.color = 'blue';
  }
}
