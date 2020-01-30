import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {

  private refresh = new BehaviorSubject(false);
  refreshConfigs = this.refresh.asObservable();

  private startedPlaying = new BehaviorSubject(null);
  startedPlaying$ = this.startedPlaying.asObservable();

  constructor() { }

  settingsUpdated() {
    this.refresh.next(true);
  }

  togglePlay(status) {
    this.startedPlaying.next(status);
  }
}
