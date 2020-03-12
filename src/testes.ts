require( 'dotenv' ).config();
import { CieloCreateCardDto } from './integrations/CIELO/DTOs/createCard.cielo.dto';
import { cieloCreateCardToken, cieloCreateSale } from './integrations/CIELO/functions.cielo';
import { CieloCreateSaleDto } from './integrations/CIELO/DTOs/createSale.cielo.dto';
import { CieloPaymentCreditCardToken }
  from './integrations/CIELO/class/paymentCreditCardToken.cieloclass';
import { CieloCreditCardToken } from './integrations/CIELO/class/creditCardToken.cieloclass';

async function createToken (): Promise<string> {
  let dto: CieloCreateCardDto = {
    Brand: 'Visa',
    //CardNumber: '4716600076290851',
    CardNumber: '4916597473898112',
    CustomerName: 'Juaum du pé di Fejaum',
    ExpirationDate: '09/2021',
    Holder: 'Juaum du pé di Fejaum'
  }
  return ( await cieloCreateCardToken( dto ) ).CardToken;
}

async function createSale ( token ) {

  let card: CieloCreditCardToken = {
    Brand: 'Visa',
    SecurityCode: '406',
    CardToken: token
  }

  let payment: CieloPaymentCreditCardToken = {
    Amount: 1,
    CreditCard: card,
    Installments: 1,
    Type: 'CreditCard',
    Capture: true
  }



  let dto: CieloCreateSaleDto = {
    MerchantOrderId: '123',
    Customer: {
      Name: 'Juaum du pé di Fejaum'
    },
    Payment: payment
  }
  try {
    return await cieloCreateSale( dto );
  } catch ( err ) {
    console.log( err.message );
    process.exit( 0 )
  }

}





async function teste () {
  let token = await createToken();
  console.log( `\n-----------------\nToken: ${token}\n-----------------\n` );

  let sale = await createSale( token );
  console.log( `\n-----------------\nReturnCode: ${sale.Payment.ReturnCode}\n-----------------\n` );


};


teste();