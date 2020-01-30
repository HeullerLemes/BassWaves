import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfiguracoesHelper } from '../../utils/configuracoes-helper';
import { ConfigurationsService } from 'src/app/services/configurations.service';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.css']
})
export class SettingsModalComponent implements OnInit {

  private configuracoes = new ConfiguracoesHelper();
  configuracoesAtuais;

  constructor(
    public dialogRef: MatDialogRef<SettingsModalComponent>,
    private configService: ConfigurationsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit() {
    this.configuracoesAtuais = this.configuracoes.getActualConfiguration();
  }

  updateConfigs() {
    this.configuracoes.saveSettings(this.configuracoesAtuais);
    this.configService.settingsUpdated();
    this.dialogRef.close();
  }

}
