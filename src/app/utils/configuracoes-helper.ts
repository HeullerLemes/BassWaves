import { Configuracoes, getConfigDefaultValues } from '../model/configuracoes';

/**
 * @description
 * Utilizada para gestão das configurações do usuário.
 */
export class ConfiguracoesHelper {

    /**
     * @description
     * Define os valores padrões das configurações.
     * O `setDefaultValues` deve ser chamado logo após o primeiro início do usuário no sistema,
     * para que os valores padrões sejam salvos na `localStorage` do usuário.
     */
    setDefaultValues(): void {
        this.saveSettings(getConfigDefaultValues());
    }

    /**
     * @description
     * Salva as configurações passadas por parâmetro no `localStorage`.
     * Recebe um objeto do tipo `Configuracoes`.
     */
    saveSettings(configuracoes: Configuracoes): void {
        localStorage.setItem('userConfigs', JSON.stringify(configuracoes));
    }

    /**
     * @description
     * Pega as configurações atuais (armazenadas no `localStorage`)
     * Retorna um objeto do tipo `Configuracoes`.
    */
    getActualConfiguration(): Configuracoes {
        if (!localStorage.getItem('userConfigs')) {
            this.setDefaultValues();
        }
        return JSON.parse(localStorage.getItem('userConfigs'));
    }

    /**
    * @description
    * Verifica se as configurações já existem no `localStorage`
    * Retorna um boolean verdadeiro se já existir, se não, falso.
    */
    alreadyExists(): boolean {
        return (localStorage.getItem('userConfigs')) ? true : false;
    }
}
