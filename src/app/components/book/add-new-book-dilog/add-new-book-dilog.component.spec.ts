import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBookDilogComponent } from './add-new-book-dilog.component';

describe('AddNewBookDilogComponent', () => {
  let component: AddNewBookDilogComponent;
  let fixture: ComponentFixture<AddNewBookDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewBookDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewBookDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
