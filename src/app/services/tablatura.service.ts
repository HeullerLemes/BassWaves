import { Injectable } from '@angular/core';
import { Nota } from '../model/nota';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class TablaturaService {

  constructor() { }
  private notas$ = new BehaviorSubject<Array<Nota>>([]);
  private tablaturaLoading = new BehaviorSubject(false);
  isLoading = this.tablaturaLoading.asObservable();

  setNotas(notas: Array<Nota>) {
    this.notas$.next(notas);
  }

  get notas() {
    return this.notas$.asObservable();
  }

  changeLoading(status: boolean) {
    this.tablaturaLoading.next(status);
  }

}
