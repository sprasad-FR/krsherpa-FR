import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EXAttachmentsComponent } from './exattachments.component';

describe('AttachmentsComponent', () => {
  let component: EXAttachmentsComponent;
  let fixture: ComponentFixture<EXAttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EXAttachmentsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EXAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
