import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertInvoiceComponent } from './expert-invoice.component';

describe('ExpertInvoiceComponent', () => {
  let component: ExpertInvoiceComponent;
  let fixture: ComponentFixture<ExpertInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertInvoiceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
