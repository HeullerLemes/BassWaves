import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaturaCardComponent } from './tablatura-card.component';

describe('TablaturaCardComponent', () => {
  let component: TablaturaCardComponent;
  let fixture: ComponentFixture<TablaturaCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaturaCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaturaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
