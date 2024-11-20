import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientComplianceComponent } from './client-compliance.component';

describe('ClientComplianceComponent', () => {
  let component: ClientComplianceComponent;
  let fixture: ComponentFixture<ClientComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientComplianceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
