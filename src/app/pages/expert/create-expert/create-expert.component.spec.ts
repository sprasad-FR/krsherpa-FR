import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExpertComponent } from './create-expert.component';

describe('CreateExpertComponent', () => {
  let component: CreateExpertComponent;
  let fixture: ComponentFixture<CreateExpertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateExpertComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
