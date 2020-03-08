/**
 * Modelo da resposta enviada pela API da Cielo ao criar um novo token de um cartão
 */
export interface CieloResponseCreateCardInterface {
  /**
   * Token de identificação do Cartão.
   */
  CardToken: string;

  Links: {
    Method: string;
    Rel: string;
    Href: string;
  }

}
