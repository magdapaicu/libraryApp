import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavBooksDetailsComponent } from './sidenav-books-details.component';

describe('SidenavBooksDetailsComponent', () => {
  let component: SidenavBooksDetailsComponent;
  let fixture: ComponentFixture<SidenavBooksDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavBooksDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavBooksDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
