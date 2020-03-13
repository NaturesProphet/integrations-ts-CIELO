require( 'dotenv' ).config();
import {
  cieloCreateCardToken, cieloCreateSale, cieloCapture, cieloCancelSale,
  cieloGetTransactionData, cieloValidateCardBIN, cieloGetStatusMessageFromSale
} from './integrations/CIELO/functions.cielo';
import { CieloPaymentCreditCardToken }
  from './integrations/CIELO/class/paymentCreditCardToken.cieloclass';
import { CieloCardToken } from './integrations/CIELO/class/creditCardToken.cieloclass';
import { CieloCommonCard } from './integrations/CIELO/class/commonCard.cieloclass';
import { CieloCustomer } from './integrations/CIELO/class/customer.cieloclass';

/**
 * dados de um cartão falso gerado no site  4Devs
 */
const myCard: CieloCommonCard = {
  Brand: 'Visa',
  CardNumber: '4716600076290851',
  //CardNumber: '4916597473898112',
  SecurityCode: '406',
  ExpirationDate: '09/2021',
  Holder: 'Juaum du pé di Fejaum'
}



/**
 * Faz uma verificação dos dados através do recurso BIN da Cielo
 */
async function binValidate () {
  console.log( `\n--------` );
  console.log( `Validando os dados....` );
  console.log( `--------` );
  return await cieloValidateCardBIN( {
    Brand: <any>myCard.Brand,
    CardNumber: myCard.CardNumber,
    CardType: 'CreditCard',
    ExpirationDate: myCard.ExpirationDate,
    Holder: myCard.Holder,
    SecurityCode: myCard.SecurityCode
  } );

}


/**
 * Cadastra o cartão e gera o cardToken
 */
async function createToken () {
  console.log( `\n--------` );
  console.log( `Criando o cardToken....` );
  console.log( `--------` );
  return await cieloCreateCardToken( {
    Brand: myCard.Brand,
    CardNumber: myCard.CardNumber,
    CustomerName: myCard.Holder,
    ExpirationDate: myCard.ExpirationDate,
    Holder: myCard.Holder
  } );
}

/**
 * Cria uma venda não capturada com o cardToken
 * @param token cardToken
 */
async function createSale ( token ) {
  console.log( `\n--------` );
  console.log( `Criando uma transação....` );
  console.log( `--------` );
  let customer: CieloCustomer = {
    Name: myCard.Holder
  };

  let card: CieloCardToken = {
    Brand: myCard.Brand,
    CardToken: token,
    SecurityCode: myCard.SecurityCode
  };

  let payment: CieloPaymentCreditCardToken = {
    Amount: 100,
    Installments: 1,
    Provider: 'SIMULADO',
    Type: 'CreditCard',
    SoftDescriptor: 'minha loja',
    CreditCard: card
  }

  return await cieloCreateSale( {
    MerchantOrderId: '123',
    Customer: customer,
    Payment: payment
  } );
}

/**
 * Verifica oe stado de uma transação
 * @param paymentId ID da transação
 */
async function getSaleInfo ( paymentId ) {
  return await cieloGetTransactionData( paymentId );
}

/**
 * Captura uma transação
 * @param paymentId ID da transação
 */
async function capture ( paymentId ) {
  console.log( `\n--------` );
  console.log( `Capturando a transação....` );
  console.log( `--------` );
  return await cieloCapture( paymentId );
}

/**
 * Cancela uma transação (estorna)
 * @param paymentId ID da transação
 */
async function cancelSale ( paymentId ) {
  console.log( `\n--------` );
  console.log( `Cancelando a transação....` );
  console.log( `--------` );
  return await cieloCancelSale( paymentId );
}



/**
 * Executa uma sequência de testes reais englobando todas as integrações
 */
async function testImplementation () {

  await binValidate();
  console.log( 'Cartão Ok.' )


  let token = ( await createToken() ).CardToken;
  console.log( `Token gerado: ${token}\n` );


  let sale = await createSale( token );
  console.log( `Transação gerada: ${sale.Payment.PaymentId}\n` );


  console.log( `\n--------` );
  console.log( `Verificando os dados da transação não capturada....` );
  console.log( `--------` );
  let situation = await getSaleInfo( sale.Payment.PaymentId );
  console.log( `Situação da transação: ${cieloGetStatusMessageFromSale( situation.Payment.Status )}\n` );


  let captureData = await capture( sale.Payment.PaymentId );
  console.log( `Situação da transação: ${cieloGetStatusMessageFromSale( captureData.Status )}\n` );


  console.log( `\n--------` );
  console.log( `Verificando os dados da transação capturada....` );
  console.log( `--------` );
  situation = await getSaleInfo( sale.Payment.PaymentId );
  console.log( `Situação da transação: ${cieloGetStatusMessageFromSale( situation.Payment.Status )}\n` );


  let cancelData = await cancelSale( sale.Payment.PaymentId );
  console.log( `Situação da transação: ${cieloGetStatusMessageFromSale( cancelData.Status )}` );


  console.log( `\n--------` );
  console.log( `Verificando os dados da transação cancelada....` );
  console.log( `--------` );
  situation = await getSaleInfo( sale.Payment.PaymentId );
  console.log( `Situação da transação: ${cieloGetStatusMessageFromSale( situation.Payment.Status )} \n` );


  console.log( `\n\nTODOS OS TESTES PASSARAM SEM ERRO.\n\n` )
};



testImplementation();
