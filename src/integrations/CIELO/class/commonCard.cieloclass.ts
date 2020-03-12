import { CieloCard } from "./abstract/card.cieloclass";

/**
 * Formato comum tanto para cartões de crédito como débito.
 */
export class CieloCommonCard extends CieloCard {
  /**
   * Número do Cartão do Comprador.
   */
  CardNumber: string;

  /**
   * 	Data de validade impresso no cartão.\
   *  Formato MM/YYYY
   */
  ExpirationDate: string;

  /**
  * Nome do Comprador impresso no cartão.
  */
  Holder?: string;

}
