import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Tablatura, Compasso, NotaTablatura } from '../../model/tablatura';
import { TablaturaService } from '../../services/tablatura.service';
import { TablaturaCreator } from '../../utils/TablaturaCreator';
import { Title } from '@angular/platform-browser';
import { Nota } from '../../model/nota';
import { MatDialog } from '@angular/material';
import { InformacoesNotaComponent } from 'src/app/informacoes-nota/informacoes-nota.component';
@Component({
  selector: 'app-tablatura-card',
  templateUrl: './tablatura-card.component.html',
  styleUrls: ['./tablatura-card.component.scss']
})
export class TablaturaCardComponent implements OnInit {

  constructor(private tablaturaService: TablaturaService,
    private ref: ChangeDetectorRef,
    private titleService: Title,
    public dialog: MatDialog) { }
  public notas$;
  public tablatura: Tablatura;
  public isLoading: boolean;
  public reversed: boolean = false;
  ngOnInit() {
    this.tablaturaService.isLoading.subscribe(isLoading => this.isLoading = isLoading);
    const tab = new TablaturaCreator();
    this.tablaturaService.notas.subscribe(res => {
      this.tablatura = tab.getTablatura(res);
      this.ref.detectChanges();
      if (this.tablatura || this.tablatura.compassos[0].cordaE.length === 0) {
        this.tablaturaService.changeLoading(false);
        this.titleService.setTitle('BWaves');
      }
    });
  }

  detalhesNota(nota: NotaTablatura) {
    if(nota.isNota){
      const dialogRef = this.dialog.open(InformacoesNotaComponent, {
        width: '350px',
        data: nota.nota
      });
    }
  }

  inverterTablatura(){
    this.reversed = !this.reversed;
  }
}
