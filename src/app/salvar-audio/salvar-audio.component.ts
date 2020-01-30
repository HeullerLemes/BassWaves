import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-salvar-audio',
  templateUrl: './salvar-audio.component.html',
  styleUrls: ['./salvar-audio.component.css']
})
export class SalvarAudioComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SalvarAudioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {nome: string}
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
