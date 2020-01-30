import { Component, OnInit } from '@angular/core';
import { MicManager } from '../../utils/MicManager';
import { AudioAnalyzer } from '../../utils/AudioAnalyzer';
import { TablaturaService } from '../../services/tablatura.service';
import { Nota } from '../../model/nota';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ConfiguracoesHelper } from '../../utils/configuracoes-helper';
import { ConfigurationsService } from 'src/app/services/configurations.service';
import { SalvarAudioComponent } from 'src/app/salvar-audio/salvar-audio.component';

var audioContext = new AudioContext();
var analyzer = new AudioAnalyzer();
var chunks = [];
var mediaRecorder;
var blob;
var canvas;
var context;
declare var MediaRecorder: any;
@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss']
})
export class RecorderComponent implements OnInit {

  micRec = new MicManager();
  canvas;
  context;
  startButton: string = "mic";
  isRecording: boolean = false;
  glowing: string = "";

  private configuracoesHelper = new ConfiguracoesHelper();

  constructor(
    private tablaturaService: TablaturaService,
    public snackBar: MatSnackBar,
    private titleService: Title,
    private configService: ConfigurationsService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    //this.canvas = document.getElementById("view1");
    //this.context = this.canvas.getContext('2d');

  }

  worker(buffer, audioContext, tablaturaService?, configuracoesHelper?) {
    configuracoesHelper = new ConfiguracoesHelper();
    var audioAnalyzer = new Worker('./assets/AudioAnalyzer.js');
    var bpm = configuracoesHelper.getActualConfiguration().metronomo.bpm;
    try {
      audioAnalyzer.postMessage([buffer.getChannelData(1), audioContext.sampleRate, bpm]);
    } catch (e) {
      audioAnalyzer.postMessage([buffer.getChannelData(0), audioContext.sampleRate, bpm]);
    }
    audioAnalyzer.onmessage = (e) => {
      audioAnalyzer.terminate();
      tablaturaService.setNotas(e.data);
    };
  }

  record() {
    if (this.isRecording) {
      this.configService.togglePlay(false);
      this.openSnackBar('Gerando Tablatura...', 'OK!');
      this.titleService.setTitle('Gerando Tablatura...');
      this.tablaturaService.setNotas(new Array<Nota>());
      this.tablaturaService.changeLoading(true);
      this.stop();
      this.startButton = 'mic';
      this.glowing = '';
    } else {
      this.configService.togglePlay(true);
      this.toggleLiveInput(this.context, this.worker, this.tablaturaService, this.configuracoesHelper);
      this.startButton = "stop";
      this.glowing="button-glow";
    }
    this.isRecording = !this.isRecording;
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      var fileReader = new FileReader();
      fileReader.readAsArrayBuffer(event.target.files[0]);
      fileReader.onload = (e: any) => {
        this.playAudioFile( <FileReader> e.target.result);
      }
    }
  }

  playAudioFile(file) {
    this.openSnackBar('Gerando Tablatura...', 'OK!');
    this.titleService.setTitle('Gerando Tablatura...');
    this.tablaturaService.setNotas(new Array<Nota>());
    this.tablaturaService.changeLoading(true);
    var context = new AudioContext();
      context.decodeAudioData(file, (buffer) => {
        this.worker(buffer, audioContext, this.tablaturaService);
        //analize(buffer, this.context, audioContext.sampleRate)
      });
    }

  file() {
    this.openSnackBar('Gerando Tablatura...', 'OK!');
    this.titleService.setTitle('Gerando Tablatura...');
    this.tablaturaService.setNotas(new Array<Nota>());

    this.tablaturaService.changeLoading(true);
    const audioRequest = new XMLHttpRequest();

    audioRequest.open('GET', './assets/sounds/h.ogg', true);
    audioRequest.responseType = 'arraybuffer';
    audioRequest.onload = () => {

      audioContext.decodeAudioData(audioRequest.response,
        (buffer) => {
          this.worker(buffer, audioContext, this.tablaturaService);
          //analize(buffer, this.context, audioContext.sampleRate)
        });
    }
    audioRequest.send();
  }

  public openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  downloadFile() {
    if(blob){
      var a = document.createElement("a");
      document.body.appendChild(a);
      var nomeAudio = "BassWaves_" + new Date().getTime();
      const dialogRef = this.dialog.open(SalvarAudioComponent, {
        width: '500px',
        data: {nome: nomeAudio}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        nomeAudio = result;
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = nomeAudio;
        a.click();
        window.URL.revokeObjectURL(url);
      });

    }
  }

  clear() {
    this.context.clearRect(0, 0, this.context.width, this.canvas.height);
    chunks = [];
  }

  stop() {
    mediaRecorder.stop();
  }

  toggleLiveInput(context, worker, tablaturaService, configuracoesHelper) {
    try {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
          /* use the stream */ /*
          var interval = setInterval(() => {
            mediaRecorder.stop();
            clearInterval(interval);
          }, 5000);
          */
         chunks = [];
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();

          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          }

          mediaRecorder.onstop = (e) => {
            blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
            var bufferURL = URL.createObjectURL(blob);
            var audioRequest = new XMLHttpRequest();
            audioRequest.open("GET", bufferURL, true);
            audioRequest.responseType = "arraybuffer";
            audioRequest.onload = () => {
              audioContext.decodeAudioData(audioRequest.response,(buffer) => {
                  worker(buffer, audioContext, tablaturaService, configuracoesHelper);
                });
            }
            audioRequest.send();
          }
        })
        .catch(function (err) {
          /* handle the error */
        });;
    } catch (e) {
      alert('getUserMedia threw exception :' + e);
    }
  }

  error() {
    alert('Stream generation failed.');
  }
}

function analize(buffer, context, sampleRate) {
  return analyzer.calc(buffer, context, sampleRate);
}
