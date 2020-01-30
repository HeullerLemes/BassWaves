/**
 * @description
 * Model de configurações.
 * As configurações devem ser separadas por objeto, os quais contém os atributos
 * da opção.
 * Sempre que declarar uma nova propriedade, favor adicionar ela
 * na função `getConfigDefaultValues`, logo abaixo.
 */
export interface Configuracoes {
    visualizacaoCards: {
        visualizaTablatura: boolean,
        visualizaMetronomo: boolean,
        visualizaNota: boolean,
        visualizaMetronomoSimultaneo: boolean
    };
    metronomo: {
        bpm: number,
    };
    sidebar: {
        aberta: boolean,
    };
    instrumento: {
        numeroDeCordas: number,
    };
    tempo: {
        visualizacaoTab: String,
    };

}

/**
 * @description
 * Define os valores padrões das configurações.
 */
export function getConfigDefaultValues(): Configuracoes {
    const configuracoes = {
        visualizacaoCards: {
            visualizaTablatura: true,
            visualizaMetronomo: true,
            visualizaNota: true,
            visualizaMetronomoSimultaneo: true
        },
        metronomo: {
            bpm: 100,
        },
        sidebar: {
            aberta: false,
        },
        instrumento: {
            numeroDeCordas : 4,
        },
        tempo: {
            visualizacaoTab : '4/4',
        }
    };
    return configuracoes;
}
