import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExpertInvoiceComponent } from './edit-expert-invoice.component';

describe('EditExpertInvoiceComponent', () => {
  let component: EditExpertInvoiceComponent;
  let fixture: ComponentFixture<EditExpertInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditExpertInvoiceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExpertInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
