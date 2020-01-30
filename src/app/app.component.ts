import { Component, OnInit } from '@angular/core';
import { ConfiguracoesHelper } from './utils/configuracoes-helper';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('false', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500)
      ]),
    ])
  ]
})

export class AppComponent implements OnInit {
  title = 'BassWaves';
  configuracoes = new ConfiguracoesHelper();
  public fadeIn: boolean;
  ngOnInit() {
    setTimeout(function () {
      this.fadeIn = true;
     }, 3000);

    if (!this.configuracoes.alreadyExists) {
      this.configuracoes.setDefaultValues();
    }
  }
}
