import { ConstantVariables } from './../constants/ConstantVariables';

export class CaracteristicaNotas {

    constructor(private constants = new ConstantVariables()){}

    noteFromPitch(frequency) {
        var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
        return this.constants[(Math.round(noteNum) + 69)%12]
    }

    frequencyFromNoteNumber(note) {
        return 440 * Math.pow(2, (note - 69) / 12);
    }

    centsOffFromPitch(frequency, note) {
        return Math.floor(1200 * Math.log(frequency / this.frequencyFromNoteNumber(note)) / Math.log(2));
    }
}