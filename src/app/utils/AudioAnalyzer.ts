import { DetectorDeFrequencias } from "./DetectorDeFrequencias";
import { ConstantVariables } from "../constants/ConstantVariables";
import { Nota } from "../model/nota";

//#region variaveis
//variaveis da calc
var data = [];
var anterior: number = 0;

var picoAlto: number = 500;
var picoBaixo: number = 500;

var lockBaixo: boolean = true;
var lockAlto: boolean = true;

var lock1: boolean = false;
var lock2: boolean = false;

var distanciaAlto: number = 0;
var distanciaBaixo: number = 0;

var distanciaGeralAlto: number = 0;
var distanciaGeralBaixo: number = 0;

var distanciaLock: boolean = false;

var cordaPuxada: number = 0;

var timeCounter: number = 0;

var lockNoteComecou: boolean = false;
var lockNoteTerminou: boolean = true;

var decidaBrusca: boolean = false;

var distanciaGeral: number = 0;

var descidaBruscaAlto: boolean = false;
var descidaBruscaBaixo: boolean = false;

var contadorDecidas: number = 0;

var limiteAcima: number = 470;
var limiteAbaixo: number = 530;

var frequencyChange: boolean = false;

//#region variaveis de ciclo
var cycleSize: number = 0;

var cycleSizeCalculated: boolean;

var indexPrimeiroMaiorAlto: number = 0;
var indexPrimeiroMaiorBaixo: number = 0;

var primeiroMaiorAmplitudeAlto: number = 500;
var segundoMaiorAmplitudeAlto: number = 500;
var indexSegundoMaiorAlto: number = 0;

var primeiroMaiorAmplitudeBaixo: number = 0;
var segundoMaiorAmplitudeBaixo: number = 0;
var indexSegundoMaiorBaixo: number = 0;

var calculatedCycleBaixo: boolean = false;
var calculatedCycleAlto: boolean = false;

var frequencia: number;
//#endregion

//#region variaveis de calculo do tempo da nota
var tempo: number;
var next: number = 0;
var mapOfnotes = new Array();
var diferencaMaisProxima: number = 0;
var ultimoMaisProximo;
//#endregion

var x: number = 0;
var y: number;

var dec = new DetectorDeFrequencias();

var IsNext: boolean;

var xc: number = 0;

var todosTempos = new Array<Nota>();

var tempoInicial: number = (1 / (240 / 90)) * 4;
var tempos = [];

var sampleRate: number;

var divisor: number;
//#endregion

export class AudioAnalyzer {

    constructor
        (private constants = new ConstantVariables()) { }

    //#region calc
    calc(buffer, context, sampleRateMic) {

        sampleRate = sampleRateMic / 4;
        divisor = (7312011/((sampleRate*269)/11025))+500;

        this.calcTimeBPM();

        data = this.mediaMovel(buffer.getChannelData(1));

        for (x = 0; x < data.length; x++) {

            //#region calculo de posiçao

            this.drawCanvasLimitCalc();

            //pega a posição do eixo y do array
            y = (1 + data[x]) * 500;

            //desenha a onda do som
            context.fillRect(xc, y, 5, 5);

            //#endregion

            //#region pico onda baixo
            //verificar se houve um pico no som na parte de baixo da onda, o lockBaixo serve para evitar de entrar no if quando a onda estiver subindo
            if (y < anterior && y > limiteAbaixo && lockBaixo) {

                limiteAbaixo = 520;

                if (lockNoteComecou) {
                    var newFrequency = Math.round(dec.detectaFrequencia(data.slice(x, (x + 500)), sampleRate));
                    if (newFrequency > frequencia + 2 || newFrequency < frequencia - 2 && newFrequency > 0)
                        frequencyChange = true;
                }


                if (lockNoteTerminou)
                    lock1 = true;

                if (lockNoteComecou && distanciaGeralBaixo > cycleSize) {
                    //#region canvas
                    context.fillRect(xc, y + 80, cycleSize, 5);
                    context.fillRect(xc, y + 80, 5, (y - picoBaixo) * (-1));
                    //#endregion
                    if ((picoBaixo - anterior) > 25 && anterior < picoBaixo && lockNoteComecou) {
                        if (contadorDecidas == 2)
                            descidaBruscaBaixo = true;
                        else
                            contadorDecidas++;
                    } else {
                        descidaBruscaAlto = false;
                        contadorDecidas = 0;
                    }
                }

                if (anterior > picoBaixo && distanciaGeral < 1000 || distanciaGeralBaixo > cycleSize) {
                    picoBaixo = anterior;
                    lockBaixo = false;
                    distanciaLock = false;
                    distanciaBaixo = 0;
                    distanciaGeralBaixo = 0;
                }

            }
            //#endregion

            //#region pico onda alto

            //verificar se houve um pico no som na parte de cima da onda, o lockAlto serve para evitar de entrar no if quando a onda estiver descendo
            if (y > anterior && y < limiteAcima && lockAlto) {

                limiteAcima = 480;

                if (lockNoteTerminou)
                    lock2 = true;

                if (lockNoteComecou && distanciaGeralAlto > cycleSize) {
                    //#region canvas
                    context.fillRect(xc, anterior - 80, cycleSize, 5);
                    context.fillRect(xc, anterior - 80, 5, (anterior - picoAlto) * (-1));
                    //#endregion
                    if ((anterior - picoAlto) > 25 && anterior > picoAlto && lockNoteComecou) {
                        if (contadorDecidas == 2)
                            descidaBruscaAlto = true;
                        else
                            contadorDecidas++;
                    } else {
                        descidaBruscaBaixo = false;
                        contadorDecidas = 0;
                    }
                }

                if (anterior < picoAlto && distanciaGeral < 1000 || distanciaGeralAlto > cycleSize) {
                    picoAlto = anterior;
                    lockAlto = false;
                    distanciaLock = false;
                    distanciaAlto = 0;
                    distanciaGeralAlto = 0;
                }

            }
            //#endregion

            //#region ifs auxiliares
            //verifica se a onda parou de descer, para liberar o acesso ao if anterior
            if (y > anterior)
                lockBaixo = true;

            // verificar se a onda parou de subir, para liberar o acesso ao else if anterior
            if (y < anterior)
                lockAlto = true;

            // se a corda foi puxada começa a somar o tempo da nota
            if (lockNoteComecou) {
                timeCounter++;
            }

            //#endregion

            //#region calculo distancia
            if (descidaBruscaAlto && descidaBruscaBaixo) {
                decidaBrusca = true;
                descidaBruscaAlto = false;
                descidaBruscaBaixo = false;
            }

            if (distanciaAlto > cycleSize + 15 && lockNoteComecou || distanciaBaixo > cycleSize + 15 && lockNoteComecou)
                distanciaLock = true;
            //#endregion

            //#region fim de nota
            //verificar se acabou o tempo de uma nota
            if (lockNoteComecou && distanciaLock || lockNoteComecou && decidaBrusca || frequencyChange && lockNoteComecou) {

                if (timeCounter >= 500) {
                    tempo = timeCounter / sampleRate;
                    IsNext = false;

                    //faz a associação das notas
                    for (let j = 0; j < this.constants.tempos.length; j++) {
                        next = Math.abs(tempo - this.constants.tempos[j].tempo);
                        if (next < diferencaMaisProxima && (Math.abs(tempo - this.constants.tempos[j].tempo) * 100) <= 10
                            || diferencaMaisProxima === 0 && (Math.abs(tempo - this.constants.tempos[j].tempo) * 100) <= 10) {
                            diferencaMaisProxima = next;
                            ultimoMaisProximo = this.constants.tempos[j];
                            IsNext = true;
                        }
                    }

                    if (ultimoMaisProximo != undefined) {
                        ultimoMaisProximo.frequencia = frequencia;

                        var note = this.noteFromPitch(frequencia);
                        ultimoMaisProximo.nota = this.constants.noteStrings[note % 12];

                        var casasPossiveis = new Array();

                        for (let z = 0; z < this.constants.casas.length; z++) {
                            if (Math.abs(frequencia - this.constants.casas[z].frequencia) <= 2)
                                casasPossiveis.push(this.constants.casas[z]);
                        }

                        diferencaMaisProxima = 0;
                        for (let x = 0; x < casasPossiveis.length; x++) {
                            if (mapOfnotes.length > 0) {
                                if(mapOfnotes[mapOfnotes.length - 1].frequencia == ultimoMaisProximo.frequencia){
                                    ultimoMaisProximo.casa = mapOfnotes[mapOfnotes.length - 1].casa;
                                    ultimoMaisProximo.corda = mapOfnotes[mapOfnotes.length - 1].corda;
                                }else{
                                    next = Math.abs(mapOfnotes[mapOfnotes.length - 1].casa - casasPossiveis[x].casa);
                                    if (next < diferencaMaisProxima || diferencaMaisProxima == 0) {
                                        diferencaMaisProxima = next;
                                        ultimoMaisProximo.casa = casasPossiveis[x].casa;
                                        ultimoMaisProximo.corda = casasPossiveis[x].corda;
                                    }
                                }
                            } else {
                                ultimoMaisProximo.casa = casasPossiveis[x].casa;
                                ultimoMaisProximo.corda = casasPossiveis[x].corda;
                                break;
                            }
                        }

                        tempos.push(tempo);

                        if (IsNext)
                            mapOfnotes.push(JSON.parse(JSON.stringify(ultimoMaisProximo)));
                    }

                } else if (timeCounter < 310) {
                    /*
                    ultimoMaisProximo = { tipo: "", tempo: "", nota: "", frequencia: "", casa: "", corda: "" };
                    ultimoMaisProximo.nota = "X";
                    ultimoMaisProximo.casa = "X";
                    if (mapOfnotes.length > 0)
                        ultimoMaisProximo.corda = mapOfnotes[mapOfnotes.length - 1].corda;
                    else
                        ultimoMaisProximo.corda = "4";
                    mapOfnotes.push(ultimoMaisProximo);
                    */
                }
                next = 0;
                diferencaMaisProxima = 0;

                this.resetVariables();

                //#region canvas
                context.fillStyle = '#ff0000';
                context.fillRect(xc + 50, 750, 10, 10);
                context.fillStyle = '#000000';
                //#endregion
            }
            //#endregion

            //#region inicio de nota
            //se houver um pico alto e baixo seguidos ou se a distancia entre uma onda e outra for muito grande, a corda foi puxada
            if (lock1 && lockNoteTerminou && lock2) {
                frequencia = Math.round(dec.detectaFrequencia(data.slice(x, (x + 500)), sampleRate));
                cycleSize = (this.constants.waveVelocity / frequencia) / divisor;
                distanciaGeral = 0;
                cordaPuxada++;
                lock1 = false;
                lock2 = false;
                lockNoteComecou = true;
                lockNoteTerminou = false;
                //#region canvas
                context.fillStyle = '#0000ff';
                context.fillRect(xc + 50, 760, 10, 10);
                context.fillStyle = '#000000';
                //#endregion
            }
            //#endregion

            //#region  update de variaveis
            //soma distancia apenas se ja tiver um nota soando
            if (lockNoteComecou) {
                distanciaAlto++;
                distanciaBaixo++;
            }

            distanciaGeral++;

            distanciaGeralAlto++;
            distanciaGeralBaixo++;

            anterior = y;
            //#endregion
        }
        //#region logs
        // console.log("map of notes");
        // console.log(mapOfnotes);
        // console.log("tempos");
        // console.log(tempos)
        // console.log("todos os tempos");
        // console.log(todosTempos);
        //#endregion
        return mapOfnotes;
    }
    //#endregion

    //#region  metodos auxiliares

    //#region calcTimeBPM
    calcTimeBPM() {
        for (let i = 0; i < 7; i++) {
            this.constants.tempos[i].tempo = tempoInicial;
            tempoInicial = tempoInicial / 2;
        }
    }
    //#endregion

    //#region drawCanvasLimitCalc
    drawCanvasLimitCalc() {
        xc++;

        if (xc > 300000) {
            //context.clearRect(0, 0, canvas.width, canvas.height);
            xc = 0;
        }
    }
    //#endregion

    //#region mediaMovel
    mediaMovel(data) {
        var medias = [];
        var array;
        //faz a media movel
        for (let i = 0; i < data.length; i += 4) {
            array = [];
            //pega os 50 primeiros elementos
            array.push.apply(array, data.slice(i, i + 50));
            //retira a maior e o menor elemento
            array.splice(array.indexOf(Math.max(array), 1), 1);
            array.splice(array.indexOf(Math.min(array), 1), 1);
            //adiciona no array final
            medias.push(array.reduce((a, b) => a + b, 0) / 50);
        }
        return medias;
    }
    //#endregion

    //#region noteFromPitch
    noteFromPitch(frequency) {
        var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
        return Math.round(noteNum) + 69;
    }
    //#endregion

    //#region frequencyFromNoteNumber
    frequencyFromNoteNumber(note) {
        return 440 * Math.pow(2, (note - 69) / 12);
    }
    //#endregion

    //#region centsOffFromPitch
    centsOffFromPitch(frequency, note) {
        return Math.floor(1200 * Math.log(frequency / this.frequencyFromNoteNumber(note)) / Math.log(2));
    }
    //#endregion

    //#region resetVariables
    resetVariables() {
        timeCounter = 0;
        lockNoteComecou = false;
        distanciaLock = false;
        decidaBrusca = false;
        lockNoteTerminou = true;
        distanciaAlto = 0;
        distanciaBaixo = 0;
        cycleSize = 0;
        limiteAcima = 470;
        limiteAbaixo = 530;
        frequencyChange = false;
        distanciaGeral = 0;
    }
    //#endregion

    //#endregion
}
