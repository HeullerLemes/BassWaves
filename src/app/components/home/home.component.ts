import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../../services/ToolbarService';
import { ConfiguracoesHelper } from '../../utils/configuracoes-helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private configuracoes = new ConfiguracoesHelper();

  configuracoesAtuais;

  constructor(private toolbar: ToolbarService) { }

  ngOnInit() {
    this.configuracoesAtuais = this.configuracoes.getActualConfiguration();
    this.toolbar.setChangeToolbar('primary');
  }

}
