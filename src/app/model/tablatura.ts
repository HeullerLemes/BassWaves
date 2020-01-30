import { Nota } from './nota';

export interface Tablatura {
  compassos: Array<Compasso>;
}

export interface Compasso {
  cordaE: Array<NotaTablatura>;
  cordaA: Array<NotaTablatura>;
  cordaD: Array<NotaTablatura>;
  cordaG: Array<NotaTablatura>;
}

export interface NotaTablatura {
  conteudo: string;
  isNota: boolean;
  nota?: Nota;
}
