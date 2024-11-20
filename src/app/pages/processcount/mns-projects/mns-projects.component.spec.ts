import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MnsProjectsComponent } from './mns-projects.component';

describe('MnsProjectsComponent', () => {
  let component: MnsProjectsComponent;
  let fixture: ComponentFixture<MnsProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MnsProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MnsProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
