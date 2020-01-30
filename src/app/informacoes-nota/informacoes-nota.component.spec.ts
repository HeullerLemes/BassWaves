import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesNotaComponent } from './informacoes-nota.component';

describe('InformacoesNotaComponent', () => {
  let component: InformacoesNotaComponent;
  let fixture: ComponentFixture<InformacoesNotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacoesNotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacoesNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
