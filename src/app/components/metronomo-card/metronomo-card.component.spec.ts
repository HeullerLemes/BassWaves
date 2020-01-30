import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetronomoCardComponent } from './metronomo-card.component';

describe('MetronomoCardComponent', () => {
  let component: MetronomoCardComponent;
  let fixture: ComponentFixture<MetronomoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetronomoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetronomoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
