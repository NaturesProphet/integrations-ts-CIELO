import { CieloPayment } from './abstract/payment.cieloclass';
import { CieloCardToken } from './creditCardToken.cieloclass';

/**
 * 
 */
export class CieloPaymentDebitCardToken extends CieloPayment {
  constructor() {
    super();
    this.Authenticate = true;
    this.Type = 'DebitCard';
  }

  /**
   * URI para onde o usuário será redirecionado após o fim do pagamento
   */
  ReturnUrl: string;

  /**
   * Cartão de débito
   */
  DebitCard: CieloCardToken;


  /**
 * Para autenticação externa com MPI 3DS 1.0 \
 * Necessário contratação de serviço terceirizado de MPI
 * https://developercielo.github.io/manual/cielo-ecommerce#autentica%C3%A7%C3%A3o-d%C3%A9bito-3ds-1.0
 */
  ExternalAuthentication?: {
    Cavv: string;
    Xid: string;
    Eci: string;
  }

}
