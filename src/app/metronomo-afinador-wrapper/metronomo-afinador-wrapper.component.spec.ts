import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetronomoAfinadorWrapperComponent } from './metronomo-afinador-wrapper.component';

describe('MetronomoAfinadorWrapperComponent', () => {
  let component: MetronomoAfinadorWrapperComponent;
  let fixture: ComponentFixture<MetronomoAfinadorWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetronomoAfinadorWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetronomoAfinadorWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
