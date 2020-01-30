import { Component, Input, HostListener, OnInit } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { ConfiguracoesHelper } from '../../utils/configuracoes-helper';
import { ToolbarService } from '../../services/ToolbarService';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';
import { MatDialog } from '@angular/material';
import { AboutModalComponent } from '../about-modal/about-modal.component';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  private configuracoes = new ConfiguracoesHelper();


  style: string;

  constructor(private toolbar: ToolbarService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  @Input() sideBar: SidenavComponent;


  /**
   * @description
   * Abre/fecha a sidebar ao clicar no menu
   */
  toggleSidebar() {
    this.salvarEstadoToolbar(!this.sideBar._opened);
    this.sideBar.toggle();
  }

  openDialogSettings(): void {
    const dialogRef = this.dialog.open(SettingsModalComponent, {
      width: '40rem',
      data: { }
    });

    

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogAbout(): void {
    const dialogRef = this.dialog.open(AboutModalComponent, {
      width: '40rem',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  /**
 * @description
 * Salva o estado da toolbar nas configurações do usuário (aberta ou fechada),
 * para que na próxima vez que ele entrar, essa opção pessoal seja mantida.
 * Recebe um boolean (com o estado atual do menu).
 */
  salvarEstadoToolbar(estado: boolean) {
    const configuracoesAtuais = this.configuracoes.getActualConfiguration();
    configuracoesAtuais.sidebar.aberta = estado;
    this.configuracoes.saveSettings(configuracoesAtuais);
  }

}
