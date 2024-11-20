import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadAttachComponent } from './lead-attach.component';

describe('LeadAttachComponent', () => {
  let component: LeadAttachComponent;
  let fixture: ComponentFixture<LeadAttachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeadAttachComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadAttachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
