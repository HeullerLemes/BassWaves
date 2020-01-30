import { AudioAnalyzer } from "./AudioAnalyzer";
import { TablaturaService } from "src/app/services/tablatura.service";
import { Directive } from "@angular/core";

var audioContext = new AudioContext();
var chunks = [];
var mediaRecorder;
var blob;
var canvas;
var context;
var analyzer = new AudioAnalyzer();
declare var MediaRecorder: any;

export class MicManager {

    constructor() {
        var tablaturaService: TablaturaService
     }

    toggleLiveInput(context) {

        try {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(function (stream) {
                    /* use the stream */
                    var interval = setInterval(() => {
                        mediaRecorder.stop();
                        clearInterval(interval);
                    }, 3000);

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
                            audioContext.decodeAudioData(audioRequest.response,
                                (buffer) => {
                                 //   this.tablaturaService.setNotas(analize(buffer, context, audioContext.sampleRate));
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

    stop() {

        mediaRecorder.stop();
    }

    downloadFile() {
        var a = document.createElement("a");
        document.body.appendChild(a);
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'teste.ogg';
        a.click();
        window.URL.revokeObjectURL(url);
    }

    clear(context, canvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        chunks = [];
    }

    file(context) {
        var tablaturaService: TablaturaService = new TablaturaService();
        var audioRequest = new XMLHttpRequest();
        audioRequest.open("GET", "./assets/sounds/dani-california.ogg", true);
        audioRequest.responseType = "arraybuffer";
        audioRequest.onload = () => {
            audioContext.decodeAudioData(audioRequest.response,
                (buffer) => {
                    var teste = analize(buffer, context, audioContext.sampleRate);
                    tablaturaService.setNotas(teste);
                });
        }
        audioRequest.send();
    }

    error() {
        alert('Stream generation failed.');
    }
}

function analize(buffer, context, sampleRate) {
    return analyzer.calc(buffer, context, sampleRate);
}
