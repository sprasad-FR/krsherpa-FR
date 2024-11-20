import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Project } from '../models/project.model';
import { StarterComponent } from './starter.component';

describe('StarterComponent', () => {
  let component: StarterComponent;
  let fixture: ComponentFixture<StarterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
