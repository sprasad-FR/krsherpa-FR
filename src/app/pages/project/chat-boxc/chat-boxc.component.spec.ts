import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBoxcComponent } from './chat-boxc.component';

describe('ChatBoxComponent', () => {
  let component: ChatBoxcComponent;
  let fixture: ComponentFixture<ChatBoxcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatBoxcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBoxcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
