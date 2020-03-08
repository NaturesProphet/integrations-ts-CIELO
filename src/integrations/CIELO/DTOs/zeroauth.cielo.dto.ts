
/**
 * Formulário do ZEROAUTH para validação de dados do cartão
 */
export class CieloZeroauthValidationDto {
  /**
   * Define o tipo de cartão utilizados: \
    * CreditCard \
    * DebitCard \
    * Se não enviado, CreditCard como default
   */
  CardType: 'CreditCard' | 'DebitCard';

  /**
   * Número do Cartão do Comprador
  */
  CardNumber: string;

  /**
   * Nome do Comprador impresso no cartão.
  */
  Holder: string;

  /**
   * Data de e validade impresso no cartão, formato MM/YYYY
  */
  ExpirationDate: string;

  /**
   * CVV
   */
  SecurityCode: string;

  /**
   * Bandeira do cartão:
  * Visa/Master/Elo
  */
  Brand: 'Visa' | 'Master' | 'Elo';


  // CardOnFile: {
  //   Usage: string;
  //   Reason: string;
  // }
}
