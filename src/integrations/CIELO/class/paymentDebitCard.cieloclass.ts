import { CieloPayment } from './abstract/payment.cieloclass';
import { CieloCommonCard } from './commonCard.cieloclass';

/**
 * 
 */
export class CieloPaymentDebitCard extends CieloPayment {
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
  DebitCard: CieloCommonCard;

}
