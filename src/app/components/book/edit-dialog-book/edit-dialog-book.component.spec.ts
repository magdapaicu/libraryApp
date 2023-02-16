import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogBookComponent } from './edit-dialog-book.component';

describe('EditDialogBookComponent', () => {
  let component: EditDialogBookComponent;
  let fixture: ComponentFixture<EditDialogBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDialogBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDialogBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
