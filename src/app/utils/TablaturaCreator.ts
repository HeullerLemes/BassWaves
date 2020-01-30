import { Tablatura, Compasso, NotaTablatura } from '../model/tablatura';
import { Nota } from '../model/nota';
import { ConfiguracoesHelper } from './configuracoes-helper';

export class TablaturaCreator {
  private configuracoesHelper = new ConfiguracoesHelper();
  private tablatura = {
    compassos: [{
      cordaE: [] as Array<NotaTablatura>,
      cordaA: [] as Array<NotaTablatura>,
      cordaD: [] as Array<NotaTablatura>,
      cordaG: [] as Array<NotaTablatura>,
    }] as Array<Compasso>
  } as Tablatura;
  private compassoAtual = 0;
  private somaTotalPower = 0;
  private caractereAtual = 0;

  getTablatura(notas) {
    if (notas.length > 0) {
      this.compassoAtual = 0;
      this.somaTotalPower = 0;
      this.caractereAtual = 0;
      this.tablatura = {
        compassos: [{
          cordaE: [] as Array<NotaTablatura>,
          cordaA: [] as Array<NotaTablatura>,
          cordaD: [] as Array<NotaTablatura>,
          cordaG: [] as Array<NotaTablatura>,
        }] as Array<Compasso>
      } as Tablatura;
    }

    this.delegarCriacaoTablatura(notas);
    return this.tablatura;
  }

  /**
  * @description
  * Itera entre as notas recebidas,
  * preenche e delega a criação da
  * tablatura.
  */
  private delegarCriacaoTablatura(notas: Array<Nota>) {
    notas.forEach(nota => {
      this.notaHandler(nota);
    });
  }

  /**
  * @description
  * Verifica qual é a nota
  * e executa o método correspondente.
  */
  private notaHandler(nota: Nota) {
    const tipoDeNota = this.definirTipoDeNota(nota.power);
    this.somaTotalPower += tipoDeNota;
    if (this.somaTotalPower > this.getPowerMaxima()) {
      if (this.caractereAtual < this.getPowerMaxima()) {
        this.preencherDelimiter('o', this.getPowerMaxima() - this.caractereAtual);
      }
      this.caractereAtual = 0;
      this.adicionarNovoCompasso();
      this.somaTotalPower = tipoDeNota;
    }
    if (nota.corda === 1) {
      this.preencherCompasso(nota, 'cordaG');
    }
    if (nota.corda === 2) {
      this.preencherCompasso(nota, 'cordaD');
    }
    if (nota.corda === 3) {
      this.preencherCompasso(nota, 'cordaA');
    }
    if (nota.corda === 4) {
      this.preencherCompasso(nota, 'cordaE');
    }
  }

  /**
  * @description
  * Recebe a nota e a corda
  * e as adiciona ao compasso atual.
  */
  private preencherCompasso(nota: Nota, corda: string) {
    this.tablatura.compassos[this.compassoAtual][corda].push({
      conteudo: String(nota.casa),
      isNota: true,
      nota: nota
    });
    this.preencherDelimiter('-', 1, corda);
    if (nota.casa > 9) { // Para não quebrar a tablatura caso o número ocupe 2 espaços;
      this.preencherDelimiter('-', this.definirTipoDeNota(nota.power) - 2);
      this.preencherDelimiter('-', 1, corda);
    } else {
      this.preencherDelimiter('-', this.definirTipoDeNota(nota.power) - 1);
    }
  }

  /**
  * @description
  * Preenche os delimitadores,
  * isto é, preenche a tablatura
  * com um caractére específicado
  */
  private preencherDelimiter(delimitador: string, numeroRepeticoes, cordaExcessao?: string) {
    this.aumentarCaractereAtual(numeroRepeticoes);
    Object.keys(this.tablatura.compassos[this.compassoAtual]).forEach(key => {
      for (let i = 0; i < numeroRepeticoes; i++) {
        if (key !== cordaExcessao) {
          this.tablatura.compassos[this.compassoAtual][key].push({
            conteudo: delimitador,
            isNota: false
          });
        }
      }
    });
  }

  /**
  * @description
  * Aumenta o caractere atual
  * do compasso dado um número de repeticoes
  */
  private aumentarCaractereAtual(numeroRepeticoes) {
    for (let i = 0; i < numeroRepeticoes; i++) {
      this.caractereAtual++;
    }
  }

  /**
  * @description
  * Retorna a 'power' máxima utilizando a configuração atual
  * de visualização de tablatura.
  */
  private getPowerMaxima() {
    const tempo = this.configuracoesHelper.getActualConfiguration().tempo.visualizacaoTab;
    const maximoPorCompasso = parseInt(tempo[0], 0);
    const tipoNota = this.definirTipoDeNota(parseInt(tempo[2], 0));
    return tipoNota * maximoPorCompasso;
  }

  /**
  * @description
  * Retorna a power da nota.
  */
  private definirTipoDeNota(nota: Number) {
    if (nota === 1) {
      return 64;
    }
    if (nota === 2) {
      return 32;
    }
    if (nota === 4) {
      return 16;
    }
    if (nota === 8) {
      return 8;
    }
    if (nota === 16) {
      return 4;
    }
    if (nota === 32) {
      return 2;
    }
    if (nota === 64) {
      return 1;
    }
  }

  /**
  * @description
  * Adiciona um novo compasso na varíavel
  * de tablatura.
  */
  private adicionarNovoCompasso() {
    this.compassoAtual++;
    this.tablatura.compassos.push({
      cordaE: [] as Array<NotaTablatura>,
      cordaA: [] as Array<NotaTablatura>,
      cordaD: [] as Array<NotaTablatura>,
      cordaG: [] as Array<NotaTablatura>
    });
  }
}

