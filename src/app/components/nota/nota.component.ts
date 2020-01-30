import { Component, OnInit } from '@angular/core';
import { DetectorDeFrequencias } from '../../utils/DetectorDeFrequencias';
import { Nota } from '../../model/nota';
import { ConstantVariables } from '../../constants/ConstantVariables';
import { AudioSteamService } from '../../services/audio-steam.service';
import { ChangeDetectorRef } from '@angular/core';

declare var MediaRecorder: any;

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit {

  notaAtual;
  mediaRecorder;
  audioContext = new AudioContext();
  intervalId;
  mediaStreamSource = null;
  analyser = null;
  buflen = 4096;
  buf = new Float32Array(this.buflen);
  detectorFrequencia: DetectorDeFrequencias = new DetectorDeFrequencias();
  constants: ConstantVariables = new ConstantVariables();
  nota: Nota = { nota: "--", tempo: null, frequencia: 0, detune: "--", detuneAmount: "--", casa: 0, corda: 0, isRest: false };
  detectorDeFrequencias = new Worker('./assets/DetectorDeFrequencias.js');
  note = 0;
  hasSound: boolean = false;

  constructor(private audioSteamService: AudioSteamService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.notaAtual = { nota: "--", tempo: null, frequencia: 0, detune: "--", detuneAmount: "--", casa: 0, corda: 0 };
    this.mic();
  }

  stop() {
    clearInterval(this.intervalId);
  }

  error() {
    alert('Stream generation failed.');
  }

  mic() {
    this.getStream();
  }

  getStream() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {

        // Create an AudioNode from the stream.
        this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
        // Connect it to the destination.
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 4096;
        this.mediaStreamSource.connect(this.analyser);
        this.updatePitch();
      }).catch(function (err) {
        console.log("erro stream" + err);
      });
  }

  noteFromPitch(frequency) {
    var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    this.note = Math.round(noteNum) + 69;
    return this.constants.noteStrings[this.note % 12];
  }

  centsOffFromPitch(frequency, note) {
    return Math.floor(1200 * Math.log(frequency / this.frequencyFromNoteNumber(note)) / Math.log(2));
  }

  frequencyFromNoteNumber(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
  }

  updatePitch() {
    this.analyser.getFloatTimeDomainData(this.buf);
    this.detectorDeFrequencias.postMessage([this.buf, this.audioContext.sampleRate]);
    this.detectorDeFrequencias.onmessage = (e) => {
      this.setNewPitch(e.data);
      setTimeout(() => {
        this.updatePitch();
      }, 50);

    }
  }

  setNewPitch(frequencia) {
    if (frequencia == -1) {
      this.hasSound = false;
      this.notaAtual.frequencia = 0;
      this.notaAtual.nota = '--';
      this.notaAtual.detune = '--';
      this.notaAtual.detuneAmount = '--';
    } else {
      this.hasSound = true;
      this.notaAtual.frequencia = Math.round(frequencia)
      this.notaAtual.nota = this.noteFromPitch(frequencia);
      var detune = this.centsOffFromPitch(frequencia, this.note);
      if (detune == 0) {
        this.notaAtual.detune = '--';
        this.notaAtual.detuneAmount = '--';
      } else {
        if (detune < 0)
          this.notaAtual.detune = "flat";
        else
          this.notaAtual.detune = "sharp";
        this.notaAtual.detuneAmount = Math.abs(detune);
      }
      console.log(this.notaAtual)
    }
  }

}
