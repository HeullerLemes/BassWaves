export class DetectorDeFrequencias {
    /**
     * Detecta a frequência dado um buffer de audio, realizando o algoritmo de correlação.
     * @name detectaFrequencia
     * @function
     * @param {array} bufferDeAudio
     * @param {int} sampleRate
     * @returns {double} frequencia
     */
    detectaFrequencia(bufferDeAudio, sampleRate = 48000) {
        const sinalSuficiente = 0.01;
        const tamanhoDoBuffer = bufferDeAudio.length;

        // Verificamos se há sinal suficiente utilizando a média quadrática das intensidades do buffer.
        if (this.mediaQuadratica(bufferDeAudio) < sinalSuficiente) {
            return -1;
        }

        // Realiza a auto correlação dos valores.
        const arrayCorrelacionado = this.realizarAutocorrelacao(bufferDeAudio);

        // Com o array correlacionado pronto, buscaremos o primeiro "mergulho" dos valores para conseguir uma precisão maior.
        const indexPrimeiroMergulho = this.posicaoDoPrimeiroMergulho(arrayCorrelacionado);

        // Encontramos a maior posição do array correlacionado a partir do primeiro mergulho.
        const maiorPosicaoDoArray = this.encontraPosicaoDoMaiorValorArray(indexPrimeiroMergulho, arrayCorrelacionado);

        // Retornamos, então, a frequência
        const frequencia = sampleRate / maiorPosicaoDoArray
        return frequencia;

    }

    /**
     * Calcula a média quadrática de um array. 
     * https://pt.wikipedia.org/wiki/M%C3%A9dia_quadr%C3%A1tica
     * @name mediaQuadratica
     * @function
     * @param {array} arrayComOsValores
     * @returns {double} mediaQuadratica
     */
    mediaQuadratica(arrayComOsValores) {
        let mediaQuadratica = 0;
        arrayComOsValores.forEach(function (valor) {
            mediaQuadratica += Math.pow(valor, 2);
        });
        mediaQuadratica = Math.sqrt(mediaQuadratica / arrayComOsValores.length);
        return mediaQuadratica;
    };

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
    realizarAutocorrelacao(arrayComOsValores) {
        const tamanhoDoArray = arrayComOsValores.length;
        // Cria um array vazio com todos os valores sendo 0.
        let arrayCorrelacionado = new Array(tamanhoDoArray).fill(0);
        for (let i = 0; i < tamanhoDoArray; i++) {
            for (let j = 0; j < tamanhoDoArray - i; j++) {
                arrayCorrelacionado[i] += arrayComOsValores[j] * arrayComOsValores[j + i];
            }
        }
        return arrayCorrelacionado;
    }

    /**
     * Encontra o primeiro "mergulho" dos valores de um array, isto é, encontra a primeira ocorrência de 
     * quando o valor sucessor é menor que o antecessor.
     * @name posicaoDoPrimeiroMergulho
     * @function
     * @param {array} arrayComOsValores
     * @returns {int} indexPrimeiroMergulho
     */
    posicaoDoPrimeiroMergulho(arrayComOsValores) {
        let indexPrimeiroMergulho = 0;
        while (arrayComOsValores[indexPrimeiroMergulho] > arrayComOsValores[indexPrimeiroMergulho + 1]) {
            indexPrimeiroMergulho++;
        }
        return indexPrimeiroMergulho;
    }

    /**
     * Encontra o maior valor de um array a partir de um index. É útil para caso você precise utilizar
     * algum valor anterior ao index passado no parâmetro (o que evita o uso do splice).
     * @name encontraPosicaoDoMaiorValorArray
     * @function
     * @param {int} index
     * @param {array} arrayComOsValores
     * @returns {int} maiorPosicaoEncontrada
     */
    encontraPosicaoDoMaiorValorArray(index, arrayComOsValores) {
        let maiorValorEncontrado = -1;
        let maiorPosicaoEncontrada = -1;
        for (let i = index; i < arrayComOsValores.length; i++) {
            if (arrayComOsValores[i] > maiorValorEncontrado) {
                maiorValorEncontrado = arrayComOsValores[i];
                maiorPosicaoEncontrada = i;
            }
        }
        return maiorPosicaoEncontrada;
    }
}
