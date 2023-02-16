import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  MatDrawer,
  MatDrawerMode,
  MatSidenav,
} from '@angular/material/sidenav';
import { SidenavServicesService } from 'src/app/components/users/user-details/sidenav-services.service';

@Component({
  selector: 'app-sidenav-books-details',
  templateUrl: './sidenav-books-details.component.html',
  styleUrls: ['./sidenav-books-details.component.css'],
})
export class SidenavBooksDetailsComponent {
  mode: MatDrawerMode = 'side';
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  isOpen = false;
  constructor(private sidenavService: SidenavServicesService) {}

  ngAfterViewInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
