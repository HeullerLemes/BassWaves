import { Tempo } from "./tempo";

export interface Nota {
    tempo: Tempo;
    nota: string;
    frequencia: number;
    detune: string;
    detuneAmount: string;
    casa: number;
    corda: number;
    power?: number;
    tabDelimiter?: number;
    isRest: boolean;
}
