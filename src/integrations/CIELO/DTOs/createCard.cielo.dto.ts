/**
 * Formulário de cadastro para novos cartões
 */
export class CieloCreateCardDto {
  /**
   * Nome do Comprador.
   */
  CustomerName: string;

  /**
   * Número do Cartão do Comprador.
   */
  CardNumber: string;

  /**
   * Nome do Comprador impresso no cartão.
   */
  Holder: string;

  /**
   * 	Data de validade impresso no cartão.\
   *  Formato MM/YYYY
   */
  ExpirationDate: string;

  /**
   * Bandeira do cartão. \
   * (Visa / Master / Elo ).
   */
  // amarrar ao enum "brand" ao ser validado.
  Brand: 'Visa' | 'Master' | 'Amex' | 'Elo' | 'Aura' | 'JCB' | 'Diners' | 'Discover';
}

