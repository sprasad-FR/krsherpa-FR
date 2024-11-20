import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectcountComponent } from './project-count.component';

describe('ProjectcountComponent', () => {
  let component: ProjectcountComponent;
  let fixture: ComponentFixture<ProjectcountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectcountComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
