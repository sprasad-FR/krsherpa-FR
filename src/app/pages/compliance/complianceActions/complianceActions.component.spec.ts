import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { complianceActionsComponent } from './complianceActions.component';

describe('complianceActionsComponent', () => {
  let component: complianceActionsComponent;
  let fixture: ComponentFixture<complianceActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [complianceActionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(complianceActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
