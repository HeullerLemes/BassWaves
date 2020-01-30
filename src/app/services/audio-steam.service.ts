import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Nota } from '../model/nota';

@Injectable({
  providedIn: 'root'
})
export class AudioSteamService {

  constructor() { }

  audioSteam$: BehaviorSubject<any> = new BehaviorSubject<any>({ nota: "teste", tempo: null, frequencia: 0, detune: "--", detuneAmount: "--", casa: 0, corda: 0 });

  setAudioSteam(audioSteam: any){
    var nota: Nota = audioSteam;
    this.audioSteam$.next([nota]);
  }

  get getAudioSteam(){
    return this.audioSteam$.asObservable();
  }
}
