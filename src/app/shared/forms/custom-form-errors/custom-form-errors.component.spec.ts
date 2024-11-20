import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormErrorsComponent } from './custom-form-errors.component';

describe('CustomFormErrorsComponent', () => {
  let component: CustomFormErrorsComponent;
  let fixture: ComponentFixture<CustomFormErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomFormErrorsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
