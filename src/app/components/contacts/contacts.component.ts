import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contacts',
  template: `<app-sidenav></app-sidenav>`,
  styleUrls: [],
})
export class ContactsComponent implements OnInit {
  constructor() {
    // iconRegistry.addSvgIconSet(
    //   sanitizier.bypassSecurityTrustResourceUrl('asset/avatars.sgv')
    // );
  }

  ngOnInit() {}
}
