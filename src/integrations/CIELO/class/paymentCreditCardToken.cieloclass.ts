import { CieloPayment } from "./abstract/payment.cieloclass";
import { CieloCardToken } from "./creditCardToken.cieloclass";


export class CieloPaymentCreditCardToken extends CieloPayment {


  CreditCard: CieloCardToken;

}

