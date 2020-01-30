import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material';
import {SettingsModalComponent} from '../settings-modal/settings-modal.component';
import { ConfiguracoesHelper } from '../../utils/configuracoes-helper';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy {

  _opened: any;
  @Input() sideBar: SidenavComponent;

  mobileQuery: MediaQueryList;
  public sideNavOpen: boolean;
  private _mobileQueryListener: () => void;
  private configuracoesHelper = new ConfiguracoesHelper();

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog){
    this.mobileQuery = media.matchMedia('(max-width: 1300px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.sideNavOpen = this.configuracoesHelper.getActualConfiguration().sidebar.aberta;
  }

  toggle() {
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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
