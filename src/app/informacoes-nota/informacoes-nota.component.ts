import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Nota } from '../model/nota';

@Component({
  selector: 'app-informacoes-nota',
  templateUrl: './informacoes-nota.component.html',
  styleUrls: ['./informacoes-nota.component.css']
})
export class InformacoesNotaComponent implements OnInit {

  ngOnInit() {

  }
  constructor(
    public dialogRef: MatDialogRef<InformacoesNotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  formatNumber(number){
    return Math.round(number);
  }
}
