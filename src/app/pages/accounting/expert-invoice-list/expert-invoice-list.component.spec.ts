import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertInvoiceListComponent } from './expert-invoice-list.component';

describe('ExpertInvoiceListComponent', () => {
  let component: ExpertInvoiceListComponent;
  let fixture: ComponentFixture<ExpertInvoiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertInvoiceListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
