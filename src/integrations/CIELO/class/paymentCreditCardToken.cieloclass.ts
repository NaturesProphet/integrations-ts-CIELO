import { CieloPayment } from "./abstract/payment.cieloclass";
import { CieloCommonCard } from './commonCard.cieloclass';
import { CieloCreditCardToken } from "./creditCardToken.cieloclass";


export class CieloPaymentCreditCardToken extends CieloPayment {


  CreditCard: CieloCreditCardToken;

}

