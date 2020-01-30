import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarAudioComponent } from './salvar-audio.component';

describe('SalvarAudioComponent', () => {
  let component: SalvarAudioComponent;
  let fixture: ComponentFixture<SalvarAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalvarAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalvarAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
