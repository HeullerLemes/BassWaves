"use strict";
//#region variaveis
//variaveis da calc
var data = [];
var anterior = 0;
var picoAlto = 500;
var picoBaixo = 500;
var lockBaixo = true;
var lockAlto = true;
var lock1 = false;
var lock2 = false;
var distanciaAlto = 0;
var distanciaBaixo = 0;
var distanciaGeralAlto = 0;
var distanciaGeralBaixo = 0;
var distanciaLock = false;
var cordaPuxada = 0;
var timeCounter = 0;
var lockNoteComecou = false;
var lockNoteTerminou = true;
var decidaBrusca = false;
var distanciaGeral = 0;
var descidaBruscaAlto = false;
var descidaBruscaBaixo = false;
var contadorDecidas = 0;
var limiteAcima = 470;
var limiteAbaixo = 530;
var frequencyChange = false;
//#region variaveis de ciclo
var cycleSize = 0;
var cycleSizeCalculated;
var indexPrimeiroMaiorAlto = 0;
var indexPrimeiroMaiorBaixo = 0;
var primeiroMaiorAmplitudeAlto = 500;
var segundoMaiorAmplitudeAlto = 500;
var indexSegundoMaiorAlto = 0;
var primeiroMaiorAmplitudeBaixo = 0;
var segundoMaiorAmplitudeBaixo = 0;
var indexSegundoMaiorBaixo = 0;
var calculatedCycleBaixo = false;
var calculatedCycleAlto = false;
var frequencia;
//#endregion
//#region variaveis de calculo do tempo da nota
var tempo;
var next = 0;
var mapOfnotes = new Array();
var diferencaMaisProxima = 0;
var ultimoMaisProximo;
var restTime;
//#endregion
var x = 0;
var y;
var IsNext;
var todosTempos = new Array();
var tempoInicial = (1 / (240 / 120)) * 4;
var temposFinal = [];
var sampleRate;
var divisor;
var timeCounterRest = 0;
var remainder = 0;
//#endregion

var cycleSizeLimiter = 0;
var autoAdjustLimiter = 0;
var frequencyDetectorsampleSize = 0;

this.waveVelocity = 299792458;
this.toSamplesDivisor = 27682;
this.noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
this.tempos = new Array({ tipo: 'semibreve', tempo: null, power: 64, tabDelimiter: 7 }, { tipo: 'minima', tempo: null, power: 32, tabDelimiter: 6 }, { tipo: 'semiminima', tempo: null, power: 16, tabDelimiter: 5 }, { tipo: 'colcheia', tempo: null, power: 8, tabDelimiter: 4 }, { tipo: 'semicolcheia', tempo: null, power: 4, tabDelimiter: 3 }, { tipo: 'fusa', tempo: null, power: 2, tabDelimiter: 2 }, { tipo: 'semifusa', tempo: null, power: 1, tabDelimiter: 1 });
this.casas = new Array({ corda: 4, casa: 0, frequencia: 41 }, { corda: 4, casa: 1, frequencia: 44 }, { corda: 4, casa: 2, frequencia: 46 }, { corda: 4, casa: 3, frequencia: 49 }, { corda: 4, casa: 4, frequencia: 52 }, { corda: 4, casa: 5, frequencia: 55 }, { corda: 4, casa: 6, frequencia: 58 }, { corda: 4, casa: 7, frequencia: 62 }, { corda: 4, casa: 8, frequencia: 65 }, { corda: 4, casa: 9, frequencia: 69 }, { corda: 4, casa: 10, frequencia: 73 }, { corda: 4, casa: 11, frequencia: 78 }, { corda: 4, casa: 12, frequencia: 82 }, { corda: 4, casa: 13, frequencia: 87 }, { corda: 4, casa: 14, frequencia: 92 }, { corda: 4, casa: 15, frequencia: 98 }, { corda: 4, casa: 16, frequencia: 104 }, { corda: 4, casa: 17, frequencia: 110 }, { corda: 4, casa: 18, frequencia: 117 }, { corda: 4, casa: 19, frequencia: 123 }, { corda: 4, casa: 20, frequencia: 131 }, { corda: 3, casa: 0, frequencia: 55 }, { corda: 3, casa: 1, frequencia: 58 }, { corda: 3, casa: 2, frequencia: 62 }, { corda: 3, casa: 3, frequencia: 65 }, { corda: 3, casa: 4, frequencia: 69 }, { corda: 3, casa: 5, frequencia: 73 }, { corda: 3, casa: 6, frequencia: 78 }, { corda: 3, casa: 7, frequencia: 82 }, { corda: 3, casa: 8, frequencia: 87 }, { corda: 3, casa: 9, frequencia: 92 }, { corda: 3, casa: 10, frequencia: 98 }, { corda: 3, casa: 11, frequencia: 104 }, { corda: 3, casa: 12, frequencia: 110 }, { corda: 3, casa: 13, frequencia: 117 }, { corda: 3, casa: 14, frequencia: 123 }, { corda: 3, casa: 15, frequencia: 131 }, { corda: 3, casa: 16, frequencia: 139 }, { corda: 3, casa: 17, frequencia: 147 }, { corda: 3, casa: 18, frequencia: 156 }, { corda: 3, casa: 19, frequencia: 165 }, { corda: 3, casa: 20, frequencia: 175 }, { corda: 2, casa: 0, frequencia: 73 }, { corda: 2, casa: 1, frequencia: 78 }, { corda: 2, casa: 2, frequencia: 82 }, { corda: 2, casa: 3, frequencia: 87 }, { corda: 2, casa: 4, frequencia: 92 }, { corda: 2, casa: 5, frequencia: 98 }, { corda: 2, casa: 6, frequencia: 104 }, { corda: 2, casa: 7, frequencia: 110 }, { corda: 2, casa: 8, frequencia: 117 }, { corda: 2, casa: 9, frequencia: 123 }, { corda: 2, casa: 10, frequencia: 131 }, { corda: 2, casa: 11, frequencia: 139 }, { corda: 2, casa: 12, frequencia: 147 }, { corda: 2, casa: 13, frequencia: 156 }, { corda: 2, casa: 14, frequencia: 165 }, { corda: 2, casa: 15, frequencia: 175 }, { corda: 2, casa: 16, frequencia: 185 }, { corda: 2, casa: 17, frequencia: 196 }, { corda: 2, casa: 18, frequencia: 208 }, { corda: 2, casa: 19, frequencia: 220 }, { corda: 2, casa: 20, frequencia: 233 }, { corda: 1, casa: 0, frequencia: 98 }, { corda: 1, casa: 1, frequencia: 104 }, { corda: 1, casa: 2, frequencia: 110 }, { corda: 1, casa: 3, frequencia: 117 }, { corda: 1, casa: 4, frequencia: 123 }, { corda: 1, casa: 5, frequencia: 131 }, { corda: 1, casa: 6, frequencia: 139 }, { corda: 1, casa: 7, frequencia: 147 }, { corda: 1, casa: 8, frequencia: 156 }, { corda: 1, casa: 9, frequencia: 165 }, { corda: 1, casa: 10, frequencia: 175 }, { corda: 1, casa: 11, frequencia: 185 }, { corda: 1, casa: 12, frequencia: 196 }, { corda: 1, casa: 13, frequencia: 208 }, { corda: 1, casa: 14, frequencia: 220 }, { corda: 1, casa: 15, frequencia: 233 }, { corda: 1, casa: 16, frequencia: 247 }, { corda: 1, casa: 17, frequencia: 262 }, { corda: 1, casa: 18, frequencia: 277 }, { corda: 1, casa: 19, frequencia: 294 }, { corda: 1, casa: 20, frequencia: 311 });

onmessage = function (e) {
    var notes = null;
    notes = this.calc(e.data[0], e.data[1], e.data[2])
    postMessage(notes);
}

//#region calc
function calc(buffer, sampleRateMic, bpm) {
    mapOfnotes = []
    sampleRate = sampleRateMic / 4;
    divisor = (7312011 / ((sampleRate * 269) / 11025)) + 500;
    cycleSizeLimiter = (sampleRate * 15) / 11025;
    autoAdjustLimiter = (sampleRate * 1000) / 11025;
    frequencyDetectorsampleSize = (sampleRate * 500) / 11025;

    this.tempoInicial = (1 / (240 / bpm)) * 4;

    this.calcTimeBPM();
    data = this.mediaMovel(buffer);
    for (x = 0; x < data.length; x++) {
        //#region calculo de posiçao
        //desenha a onda do som
        //context.fillRect(xc, y, 1, 1);
        //pega a posição do eixo y do array
        y = (1 + data[x]) * 500;
        //#endregion
        //#region pico onda baixo
        //verificar se houve um pico no som na parte de baixo da onda, o lockBaixo serve para evitar de entrar no if quando a onda estiver subindo
        if (y < anterior && y > limiteAbaixo && lockBaixo) {
            limiteAbaixo = 520;
            if (lockNoteComecou) {
                var newFrequency = Math.round(this.detectaFrequencia(data.slice(x, (x + frequencyDetectorsampleSize)), sampleRate));
                if (newFrequency > frequencia + 2 || newFrequency < frequencia - 2 && newFrequency > 0)
                    frequencyChange = true;
            }
            if (lockNoteTerminou)
                lock1 = true;
            if (lockNoteComecou && distanciaGeralBaixo > cycleSize) {
                //#region canvas
                //context.fillRect(xc, y + 80, cycleSize, 1);
                //context.fillRect(xc, y + 80, 1, (y - picoBaixo) * (-1));
                //#endregion
                if ((picoBaixo - anterior) > 25 && anterior < picoBaixo && lockNoteComecou) {
                    if (contadorDecidas == 2)
                        descidaBruscaBaixo = true;
                    else
                        contadorDecidas++;
                }
                else {
                    descidaBruscaAlto = false;
                    contadorDecidas = 0;
                }
            }
            if (anterior > picoBaixo && distanciaGeral < autoAdjustLimiter || distanciaGeralBaixo > cycleSize) {
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
                //context.fillRect(xc, anterior - 80, cycleSize, 1);
                //context.fillRect(xc, anterior - 80, 1, (anterior - picoAlto) * (-1));
                //#endregion
                if ((anterior - picoAlto) > 25 && anterior > picoAlto && lockNoteComecou) {
                    if (contadorDecidas == 2)
                        descidaBruscaAlto = true;
                    else
                        contadorDecidas++;
                }
                else {
                    descidaBruscaBaixo = false;
                    contadorDecidas = 0;
                }
            }
            if (anterior < picoAlto && distanciaGeral < autoAdjustLimiter || distanciaGeralAlto > cycleSize) {
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
        } else {
            timeCounterRest++;
        }
        //#endregion
        //#region calculo distancia
        if (descidaBruscaAlto && descidaBruscaBaixo) {
            decidaBrusca = true;
            descidaBruscaAlto = false;
            descidaBruscaBaixo = false;
        }
        if (distanciaAlto > cycleSize + cycleSizeLimiter && lockNoteComecou || distanciaBaixo > cycleSize + cycleSizeLimiter && lockNoteComecou)
            distanciaLock = true;
        //#endregion
        //#region fim de nota
        //verificar se acabou o tempo de uma nota
        if (lockNoteComecou && distanciaLock || lockNoteComecou && decidaBrusca || frequencyChange && lockNoteComecou) {
            if (timeCounter >= frequencyDetectorsampleSize) {
                tempo = timeCounter / sampleRate;
                IsNext = false;
                //faz a associação das notas
                for (var j = 0; j < this.tempos.length; j++) {
                    next = Math.abs(tempo - this.tempos[j].tempo);
                    if (next < diferencaMaisProxima && (Math.abs(tempo - this.tempos[j].tempo) * 100) <= 10
                        || diferencaMaisProxima === 0 && (Math.abs(tempo - this.tempos[j].tempo) * 100) <= 10) {
                        diferencaMaisProxima = next;
                        ultimoMaisProximo = this.tempos[j];
                        IsNext = true;
                    }
                }
                if (ultimoMaisProximo != undefined) {
                    ultimoMaisProximo.frequencia = frequencia;
                    var note = this.noteFromPitch(frequencia);
                    ultimoMaisProximo.nota = this.noteStrings[note % 12];
                    var casasPossiveis = new Array();
                    for (var z = 0; z < this.casas.length; z++) {
                        if (Math.abs(frequencia - this.casas[z].frequencia) <= 2)
                            casasPossiveis.push(this.casas[z]);
                    }
                    diferencaMaisProxima = 0;
                    for (var x_1 = 0; x_1 < casasPossiveis.length; x_1++) {
                        if (mapOfnotes.length > 0) {
                            if (mapOfnotes[mapOfnotes.length - 1].frequencia == ultimoMaisProximo.frequencia) {
                                ultimoMaisProximo.casa = mapOfnotes[mapOfnotes.length - 1].casa;
                                ultimoMaisProximo.corda = mapOfnotes[mapOfnotes.length - 1].corda;
                            }
                            else {
                                next = Math.abs(mapOfnotes[mapOfnotes.length - 1].casa - casasPossiveis[x_1].casa);
                                if (next < diferencaMaisProxima || diferencaMaisProxima == 0) {
                                    diferencaMaisProxima = next;
                                    ultimoMaisProximo.casa = casasPossiveis[x_1].casa;
                                    ultimoMaisProximo.corda = casasPossiveis[x_1].corda;
                                }
                            }
                        }
                        else {
                            ultimoMaisProximo.casa = casasPossiveis[x_1].casa;
                            ultimoMaisProximo.corda = casasPossiveis[x_1].corda;
                            break;
                        }
                    }
                    temposFinal.push(tempo);
                    if (IsNext){
                        ultimoMaisProximo.isRest = false;
                        mapOfnotes.push(JSON.parse(JSON.stringify(ultimoMaisProximo)));
                    }
                }
            }
            else if (timeCounter < 310) {
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
            //context.fillStyle = '#ff0000';
            //context.fillRect(xc + 50, 750, 10, 10);
            //context.fillStyle = '#000000';
            //#endregion
        }
        //#endregion
        //#region inicio de nota
        //se houver um pico alto e baixo seguidos ou se a distancia entre uma onda e outra for muito grande, a corda foi puxada
        if (lock1 && lockNoteTerminou && lock2) {
            frequencia = Math.round(this.detectaFrequencia(data.slice(x, (x + frequencyDetectorsampleSize)), sampleRate));
            cycleSize = (this.waveVelocity / frequencia) / divisor;
            distanciaGeral = 0;
            cordaPuxada++;
            lock1 = false;
            lock2 = false;
            lockNoteComecou = true;
            lockNoteTerminou = false;
            /*
            if (timeCounterRest >= frequencyDetectorsampleSize && mapOfnotes.length > 0) {
                tempo = timeCounterRest / sampleRate;

                IsNext = false;
                for (var j = 0; j < this.tempos.length; j++) {
                    let restCount = Math.round(tempo / tempos[j].tempo);

                    if(restCount > 0){
                        for(let restIndex = 0; restIndex < restCount; restIndex++){
                            restTime = this.tempos[j];
                            restTime.isRest = true; -1;
                            mapOfnotes.push(JSON.parse(JSON.stringify(restTime)));
                        }
                        //break;

                        var decimals = tempo / tempos[j].tempo;
                        decimals = decimals - Math.floor(decimals);
                        decimals = decimals.toFixed(1);
                        if(decimals > 0.4 && decimals < 0.6){
                            remainder = tempo % tempos[j].tempo;
                            if(remainder != 0)
                                tempo = remainder;
                        }else
                            j = this.tempos.length;

                    }
                }
                this.resetVariables();
            }
            */
            //#region canvas
            //context.fillStyle = '#0000ff';
            //context.fillRect(xc + 50, 760, 10, 10);
            //context.fillStyle = '#000000';
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
};
//#endregion
//#region  metodos auxiliares
//#region calcTimeBPM
function calcTimeBPM() {
    for (var i = 0; i < 7; i++) {
        this.tempos[i].tempo = tempoInicial;
        tempoInicial = tempoInicial / 2;
    }
};
//#endregion

//#region mediaMovel
function mediaMovel(data) {
    var medias = [];
    var array;
    //faz a media movel
    for (var i = 0; i < data.length; i += 4) {
        array = [];
        //pega os 50 primeiros elementos
        array.push.apply(array, data.slice(i, i + 50));
        //retira a maior e o menor elemento
        array.splice(array.indexOf(Math.max(array), 1), 1);
        array.splice(array.indexOf(Math.min(array), 1), 1);
        //adiciona no array final
        medias.push(array.reduce(function (a, b) { return a + b; }, 0) / 50);
    }
    return medias;
};
//#endregion
//#region noteFromPitch
function noteFromPitch(frequency) {
    var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return Math.round(noteNum) + 69;
};
//#endregion
//#region frequencyFromNoteNumber
function frequencyFromNoteNumber(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
};
//#endregion
//#region centsOffFromPitch
function centsOffFromPitch(frequency, note) {
    return Math.floor(1200 * Math.log(frequency / this.frequencyFromNoteNumber(note)) / Math.log(2));
};
//#endregion
//#region resetVariables
function resetVariables() {
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
    timeCounterRest = 0;
    remainder = 0;
};

/**
* Detecta a frequência dado um buffer de audio, realizando o algoritmo de correlação.
* @name detectaFrequencia
* @function
* @param {array} bufferDeAudio
* @param {int} sampleRate
* @returns {double} frequencia
*/
function detectaFrequencia(bufferDeAudio, sampleRate) {
    if (sampleRate === void 0) { sampleRate = 48000; }
    var sinalSuficiente = 0.01;
    var tamanhoDoBuffer = bufferDeAudio.length;
    // Verificamos se há sinal suficiente utilizando a média quadrática das intensidades do buffer.
    if (this.mediaQuadratica(bufferDeAudio) < sinalSuficiente) {
        return -1;
    }
    // Realiza a auto correlação dos valores.
    var arrayCorrelacionado = this.realizarAutocorrelacao(bufferDeAudio);
    // Com o array correlacionado pronto, buscaremos o primeiro "mergulho" dos valores para conseguir uma precisão maior.
    var indexPrimeiroMergulho = this.posicaoDoPrimeiroMergulho(arrayCorrelacionado);
    // Encontramos a maior posição do array correlacionado a partir do primeiro mergulho.
    var maiorPosicaoDoArray = this.encontraPosicaoDoMaiorValorArray(indexPrimeiroMergulho, arrayCorrelacionado);
    // Retornamos, então, a frequência
    var frequencia = sampleRate / maiorPosicaoDoArray;
    return frequencia;
};
/**
 * Calcula a média quadrática de um array.
 * https://pt.wikipedia.org/wiki/M%C3%A9dia_quadr%C3%A1tica
 * @name mediaQuadratica
 * @function
 * @param {array} arrayComOsValores
 * @returns {double} mediaQuadratica
 */
function mediaQuadratica(arrayComOsValores) {
    var mediaQuadratica = 0;
    arrayComOsValores.forEach(function (valor) {
        mediaQuadratica += Math.pow(valor, 2);
    });
    mediaQuadratica = Math.sqrt(mediaQuadratica / arrayComOsValores.length);
    return mediaQuadratica;
};
;
/**
 * Realiza a auto correlação de um array.
 * A auto correlação multiplica todos os valores de um array por todos os outros valores contidos neste array.
 * Isto irá criar uma ênfase no valor fundamental do array.
 * https://pt.wikipedia.org/wiki/Autocorrela%C3%A7%C3%A3o
 * @name realizarAutocorrelacao
 * @function
 * @param {array} arrayComOsValores
 * @returns {array} arrayComCorrelacao
 */
function realizarAutocorrelacao(arrayComOsValores) {
    var tamanhoDoArray = arrayComOsValores.length;
    // Cria um array vazio com todos os valores sendo 0.
    var arrayCorrelacionado = new Array(tamanhoDoArray).fill(0);
    for (var i = 0; i < tamanhoDoArray; i++) {
        for (var j = 0; j < tamanhoDoArray - i; j++) {
            arrayCorrelacionado[i] += arrayComOsValores[j] * arrayComOsValores[j + i];
        }
    }
    return arrayCorrelacionado;
};
/**
 * Encontra o primeiro "mergulho" dos valores de um array, isto é, encontra a primeira ocorrência de
 * quando o valor sucessor é menor que o antecessor.
 * @name posicaoDoPrimeiroMergulho
 * @function
 * @param {array} arrayComOsValores
 * @returns {int} indexPrimeiroMergulho
 */
function posicaoDoPrimeiroMergulho(arrayComOsValores) {
    var indexPrimeiroMergulho = 0;
    while (arrayComOsValores[indexPrimeiroMergulho] > arrayComOsValores[indexPrimeiroMergulho + 1]) {
        indexPrimeiroMergulho++;
    }
    return indexPrimeiroMergulho;
};
/**
 * Encontra o maior valor de um array a partir de um index. É útil para caso você precise utilizar
 * algum valor anterior ao index passado no parâmetro (o que evita o uso do splice).
 * @name encontraPosicaoDoMaiorValorArray
 * @function
 * @param {int} index
 * @param {array} arrayComOsValores
 * @returns {int} maiorPosicaoEncontrada
 */
function encontraPosicaoDoMaiorValorArray(index, arrayComOsValores) {
    var maiorValorEncontrado = -1;
    var maiorPosicaoEncontrada = -1;
    for (var i = index; i < arrayComOsValores.length; i++) {
        if (arrayComOsValores[i] > maiorValorEncontrado) {
            maiorValorEncontrado = arrayComOsValores[i];
            maiorPosicaoEncontrada = i;
        }
    }
    return maiorPosicaoEncontrada;
};
