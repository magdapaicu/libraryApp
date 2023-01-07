import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FPasswordComponent } from './f-password.component';

describe('FPasswordComponent', () => {
  let component: FPasswordComponent;
  let fixture: ComponentFixture<FPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
