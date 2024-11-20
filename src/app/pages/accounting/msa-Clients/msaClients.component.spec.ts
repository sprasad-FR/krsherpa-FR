import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { msaClientsComponent } from './msa-Clients.component';

describe('InvoiceListComponent', () => {
  let component: msaClientsComponent;
  let fixture: ComponentFixture<msaClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [msaClientsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(msaClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
