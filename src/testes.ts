require( 'dotenv' ).config();
import { CieloCreateCardDto } from "./integrations/CIELO/DTOs/createCard.cielo.dto";
import { cieloCreateCardToken, cieloCreateSale, cieloValidateCard } from './integrations/CIELO/functions.cielo';
import { CieloCreateSaleDto } from "./integrations/CIELO/DTOs/createSale.cielo.dto";
import { CieloZeroauthValidationDto } from "./integrations/CIELO/DTOs/zeroauth.cielo.dto";

async function Teste () {
  let cardToken: string;

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
      Name: 'Cliente de teste'
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
  console.log( `\n-----\nVenda efetuada\n${JSON.stringify( sale, null, 2 )}\n-----\n` );


}





Teste();