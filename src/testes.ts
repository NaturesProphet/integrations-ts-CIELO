require( 'dotenv' ).config();
import { CieloCreateCardDto } from "./integrations/CIELO/DTOs/createCard.cielo.dto";
import { cieloCreateCardToken, cieloCreateSale, cieloValidateCard, cieloGetTransactionData, cieloCancelSale } from './integrations/CIELO/functions.cielo';
import { CieloCreateSaleDto } from "./integrations/CIELO/DTOs/createSale.cielo.dto";
import { CieloZeroauthValidationDto } from "./integrations/CIELO/DTOs/zeroauth.cielo.dto";

async function Teste () {
  let cardToken: string;
  let paymentId: string;

  // // Validar o cartão
  // let dtoCheck: CieloZeroauthValidationDto = {
  //   Brand: 'Master',
  //   CardNumber: '4532117080573701',
  //   CardType: 'CreditCard',
  //   ExpirationDate: '12/2020',
  //   Holder: 'Comprador T Cielo',
  //   SecurityCode: '123'
  // }
  // let validation = await cieloValidateCard( dtoCheck );
  // console.log( `\n-----\nVALIDAÇÃO:\n${JSON.stringify( validation, null, 2 )}\n-----\n` );


  // cadastrar cartão
  let cardDto: CieloCreateCardDto = {
    Brand: 'Master',
    CardNumber: '5552301154343829',
    CustomerName: 'Cliente de teste',
    ExpirationDate: '12/2020',
    Holder: 'Comprador T Cielo'
  }

  cardToken = ( await cieloCreateCardToken( cardDto ) ).CardToken;
  console.log( `\n-----\nCardToken Criado: ${JSON.stringify( cardToken, null, 2 )}\n-----\n` );




  // CRIANDO TRANSAÇÃO...
  console.log( 'Iniciando uma venda....' );
  let dtoSale: CieloCreateSaleDto = {
    Customer: {
      Name: 'Cliente de teste',
      Birthdate: new Date(),
      Email: 'nome@server.com',
      Identity: "12312312300",
      IdentityType: "CPF"
    },
    MerchantOrderId: '123',
    capture: true,
    Payment: {
      Amount: 100,
      Installments: 1,
      Type: 'CreditCard',
      CreditCard: {
        Brand: 'Visa',
        CardToken: cardToken,
        SecurityCode: '123'
      }
    }
  }
  let sale = await cieloCreateSale( dtoSale );
  paymentId = sale.Payment.PaymentId;
  console.log( `\n-----\nVenda efetuada\n${sale.Payment.ReturnMessage}\n-----\n` );

  // consultando dados da transação
  let data = await cieloGetTransactionData( paymentId );
  console.log( `\n-----\nDados da transação:\n ${JSON.stringify( data, null, 2 )} \n-----\n` );


  // CANCELANDO OPERAÇÃO
  console.log( `\n-----\nCancelando operação.....\n-----\n` );
  let data2 = await cieloCancelSale( paymentId );
  console.log( `\n-----\nResultado:\n-----\n${JSON.stringify( data2, null, 2 )}` );


}





Teste();