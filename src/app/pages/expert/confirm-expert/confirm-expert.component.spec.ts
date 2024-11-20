import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmExpertComponent } from './confirm-expert.component';

describe('ConfirmExpertComponent', () => {
  let component: ConfirmExpertComponent;
  let fixture: ComponentFixture<ConfirmExpertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmExpertComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
