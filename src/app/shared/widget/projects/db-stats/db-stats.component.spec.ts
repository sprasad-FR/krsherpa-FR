import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbStatsComponent } from './db-stats.component';

describe('ActiveProjectComponent', () => {
  let component: DbStatsComponent;
  let fixture: ComponentFixture<DbStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
