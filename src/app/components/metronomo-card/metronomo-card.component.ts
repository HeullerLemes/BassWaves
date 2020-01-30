import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSliderChange } from '@angular/material';
import { TablaturaService } from '../../services/tablatura.service';
import { Nota } from '../../model/nota';
import { ConfiguracoesHelper } from '../../utils/configuracoes-helper';
import { ConfigurationsService } from 'src/app/services/configurations.service';
import { Configuracoes } from 'src/app/model/configuracoes';


@Component({
  selector: 'app-metronomo-card',
  templateUrl: './metronomo-card.component.html',
  styleUrls: ['./metronomo-card.component.scss']
})
export class MetronomoCardComponent implements OnInit {

  private configuracoes = new ConfiguracoesHelper();
  //@Output() input: EventEmitter<MatSliderChange> = new EventEmitter();

  audioContext = null;
  isPlaying = false;      // Are we currently playing?
  startTime;              // The start time of the entire sequence.
  current16thNote;        // What note is currently last scheduled?
  tempo = 120.0;          // tempo (in beats per minute)
  lookahead = 25.0;       // How frequently to call scheduling function
  //(in milliseconds)
  scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec)
  // This is calculated from lookahead, and overlaps
  // with next interval (in case the timer is late)
  nextNoteTime = 0.0;     // when the next note is due.
  noteResolution = 2;     // 0 == 16th, 1 == 8th, 2 == quarter note
  noteLength = 0.05;      // length of "beep" (in seconds)
  last16thNoteDrawn = -1; // the last "box" we drew on the screen
  notesInQueue = [];      // the notes that have been put into the web audio,
  // and may or may not have played yet. {note, time}
  timerWorker = null; // The Web Worker used to fire timer messages
  playButton = "play_circle_outline";
  configurations: Configuracoes;
  constructor(private configService: ConfigurationsService) {
  }

  ngOnInit() {
    this.audioContext = new AudioContext();
    this.timerWorker = new Worker("../../../assets/metronomeworker.js");

    this.timerWorker.onmessage = (e) => {
      if (e.data == "tick") {
        this.scheduler();
      }
      else
        console.log("message: " + e.data);
    };
    this.timerWorker.postMessage({ "interval": this.lookahead });
    this.configService.refreshConfigs.subscribe(config => this.configurations = this.configuracoes.getActualConfiguration());
    this.configService.startedPlaying$.subscribe(message => {
      this.stop();
      if (this.configurations.visualizacaoCards.visualizaMetronomoSimultaneo && message !== null) {
        message ? this.playWorker() : this.stop();
      }
    });
  }

  scheduler() {
    while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
      this.scheduleNote(this.current16thNote, this.nextNoteTime);
      this.nextNote();
    }
  }

  scheduleNote(beatNumber, time) {
    // push the note on the queue, even if we're not playing.
    this.notesInQueue.push({ note: beatNumber, time: time });

    if ((this.noteResolution == 1) && (beatNumber % 2))
      return; // we're not playing non-8th 16th notes
    if ((this.noteResolution == 2) && (beatNumber % 4))
      return; // we're not playing non-quarter 8th notes

    // create an oscillator
    var osc = this.audioContext.createOscillator();
    osc.connect(this.audioContext.destination);
    if (beatNumber % 16 === 0)    // beat 0 == high pitch
      osc.frequency.value = 880.0;
    else if (beatNumber % 4 === 0)    // quarter notes = medium pitch
      osc.frequency.value = 440.0;
    else {
      osc.frequency.value = 220.0;
    }                        // other 16th notes = low pitch

    osc.start(time);
    osc.stop(time + this.noteLength);
  }

  nextNote() {
    // Advance current note and time by a 16th note...
    var secondsPerBeat = 60.0 / this.tempo;    // Notice this picks up the CURRENT
    // tempo value to calculate beat length.
    this.nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time

    this.current16thNote++;    // Advance the beat number, wrap to zero
    if (this.current16thNote == 16) {
      this.current16thNote = 0;
    }
  }

  play() {
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) { // start playing
      this.current16thNote = 0;
      this.nextNoteTime = this.audioContext.currentTime;
      this.timerWorker.postMessage("start");
      this.playButton = "pause";
      return "stop";
    } else {
      this.timerWorker.postMessage("stop");
      this.playButton = "play_circle_outline";
      return "play";
    }
  }

  stop(){
    this.timerWorker.postMessage("stop");
    this.playButton = "play_circle_outline";
    return "play";
  }

  playWorker(){
    this.current16thNote = 0;
    this.nextNoteTime = this.audioContext.currentTime;
    this.timerWorker.postMessage("start");
    this.playButton = "pause";
    return "stop";
  }

  sumBPM() {
    if (this.tempo < 240) {
      this.tempo++;
      this.atualizarBPM();
    }
  }

  subtractBPM() {
    if (this.tempo > 40) {
      this.tempo--;
      this.atualizarBPM();
    }

  }

  atualizarBPM() {
    const configuracoesAtuais = this.configuracoes.getActualConfiguration();
    configuracoesAtuais.metronomo.bpm = this.tempo;
    this.configuracoes.saveSettings(configuracoesAtuais);
  }
}


