import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientInvoiceComponent } from './edit-client-invoice.component';

describe('EditClientInvoiceComponent', () => {
  let component: EditClientInvoiceComponent;
  let fixture: ComponentFixture<EditClientInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditClientInvoiceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClientInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
