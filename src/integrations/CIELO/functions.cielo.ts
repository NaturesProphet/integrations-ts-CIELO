import { CieloCreateCardDto } from "./DTOs/createCard.cielo.dto";
import { CieloResponseCreateCardInterface } from './responseSchemas/createCard.response.cielo';
import { CieloCreateSaleDto } from './DTOs/createSale.cielo.dto';
import { CieloResponseCreateSaleInterface } from './responseSchemas/createSale.cielo.response';
import { post, put, get, Options } from 'request-promise';
import { CieloValidateCardDto } from './DTOs/zeroauth.cielo.dto';
import {
  cieloURLRequest, cieloEndpointForCards, cieloURLQuery,
  cieloMerchantId, cieloMerchantKey, cieloEndpointForSales,
  cieloEndpointForZeroauthValidation, cieloEndpointForCardBin
} from '../../common/configs/cielo.config';

import { CieloSaleResponseInterface } from './responseSchemas/sale.cielo.response';
import { CieloCardBinResponseInterface } from './responseSchemas/bin.cielo.response';
import { CieloResponseCaptureInterface } from './responseSchemas/capture.cielo.response';

/**
 * Cadastra um novo cartão na API da Cielo e retorna um 
 * token seguro para ser armazenado no banco de dados.
 * @param dto Formulário de cadastro de cartão (CieloCreateCardDto)
 */
export async function cieloCreateCardToken ( dto: CieloCreateCardDto ): Promise<CieloResponseCreateCardInterface> {

  let options: Options = {
    uri: `${cieloURLRequest}${cieloEndpointForCards}`,
    body: dto,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Request-Promise',
      'Merchantid': cieloMerchantId,
      'Merchantkey': cieloMerchantKey
    }
  }

  try {
    return await post( options );
  } catch ( err ) {
    if ( err.message ) {
      throw new Error( `Erro ao fazer a requisição à Cielo: ${err.message}` );
    } else {
      throw new Error( 'Erro ao fazer a requisição à Cielo.' );
    }
  }
}

/**
 * Cria uma nova venda na API da Cielo utilizando 
 * um token válido de um cartão devidamente registrado.
 * @param dto Formulário de venda (CieloCreateSaleDto)
 */
export async function cieloCreateSale ( dto: CieloCreateSaleDto ) {
  let options: Options = {
    uri: `${cieloURLRequest}${cieloEndpointForSales}`,
    body: dto,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Request-Promise',
      'Merchantid': cieloMerchantId,
      'Merchantkey': cieloMerchantKey
    }
  }

  let paymentData: CieloResponseCreateSaleInterface;
  try {
    paymentData = await post( options );
  } catch ( err ) {
    if ( err.message ) {
      throw new Error( `Erro ao fazer a requisição de pagamentos à Cielo: ${err.message}` );
    } else {
      throw new Error( 'Erro ao fazer a requisição de pagamentos à Cielo.' );
    }
  }
  switch ( paymentData.Payment.Status ) {
    case 0:
      return paymentData;
      break;
    case 1:
      return paymentData;
      break;
    case 2:
      return paymentData;
      break;
    default:

      switch ( paymentData.Payment.ReturnCode ) {
        case '1':
          throw new Error( `Não Autorizado. `
            + `Status: ${cieloGetStatusMessageFromSale( paymentData.Payment.Status )}\n${JSON.stringify( paymentData, null, 2 )}` );
          break;
        case '05':
          throw new Error( `Não Autorizado. `
            + `Status: ${cieloGetStatusMessageFromSale( paymentData.Payment.Status )}` );
          break;

        case '57':
          throw new Error( `Cartão Expirado. `
            + `Status: ${cieloGetStatusMessageFromSale( paymentData.Payment.Status )}` );
          break;

        case '70':
          throw new Error( `Problemas com o Cartão de Crédito! `
            + `Verifique os dados. Se o problema persistir, `
            + `contate a sua administradora do cartão. `
            + `Status: ${cieloGetStatusMessageFromSale( paymentData.Payment.Status )}` );
          break;

        case '77':
          throw new Error( `Cartão Cancelado. `
            + `Status: ${cieloGetStatusMessageFromSale( paymentData.Payment.Status )}` );
          break;

        case '78':
          throw new Error( `Cartão Bloqueado. `
            + `Status: ${cieloGetStatusMessageFromSale( paymentData.Payment.Status )}` );
          break;

        case '99':
          if ( paymentData.Payment.ReturnMessage == 'Time Out'
            || paymentData.Payment.ReturnMessage == 'Timed Out' ) {
            throw new Error( `Time Out. Tente novamente daqui a pouco. `
              + `Status: ${cieloGetStatusMessageFromSale( paymentData.Payment.Status )}` );
          }
          else if ( paymentData.Payment.ReturnMessage == 'Operation Successful' ) {
            // deu bom, só q meio estranho...
            return paymentData;
          }
          break;

        default:
          if ( paymentData && paymentData.Payment ) {
            throw new Error( `Erro ao processar pagamento: `
              + `Cielo ReturnCode: ${paymentData.Payment.ReturnCode} `
              + `Cielo ReturnMessage: ${paymentData.Payment.ReturnMessage} `
              + `Cielo Status: ${cieloGetStatusMessageFromSale( paymentData.Payment.Status )}` +
              `\n\n${JSON.stringify( paymentData, null, 2 )}\n\n` );
          }
          else {
            throw new Error( `Erro inesperado ao processar pagamento.` );
          }
          break;
      }
  }
}


/**
 * Função auxiliar para interpretar o Status dos pagamentos e 
 * gerar uma mensagem de retorno apropriada.
 * @param status Código de Payment.Status
 */
export function cieloGetStatusMessageFromSale ( status: number ): string {
  switch ( status ) {
    case 0:
      return '0 (NotFinished) -  Aguardando atualização de status. (compra no débito aguardando autenticação?)';
      break;
    case 1:
      return '1 (Authorized) - Pagamento apto a ser capturado ou definido como pago.'
      break;
    case 2:
      return '2 (PaymentConfirmed) - Pagamento confirmado e finalizado.';
      break;
    case 3:
      return '3 (Denied) - Pagamento negado por Autorizador.';
      break;
    case 10:
      return '10 (voided) - Pagamento cancelado.';
      break;
    case 11:
      return '11 (Refunded) - Pagamento cancelado após 23:59 do dia de autorização.';
      break;
    case 12:
      return '12 (Pending) - Aguardando Status de instituição financeira.';
      break;
    case 13:
      return '13 (Aborted) - Pagamento cancelado por falha no processamento ou por ação do AF';
      break;
    case 20:
      return '20 - (Scheduled) - Recorrência agendada.';
      break;
    default:
      return `0Código de status (${status}) desconhecido`;
      break;
  }
}


/**
 * Valida os dados de um cartão através do recurso Zeroauth da Cielo. \
 * Necessário cadastro requisitando o recurso Zeroauth. \
 * \
 * NÃO FUNCIONA NO SANDBOX -_-
 * @param dto Formulário de validação Zeroauth da Cielo para cartões.
 */
export async function cieloValidateCardZeroAuth ( dto: CieloValidateCardDto ) {
  let options: Options = {
    uri: `${cieloURLRequest}${cieloEndpointForZeroauthValidation}`,
    body: dto,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Request-Promise',
      'merchantId': cieloMerchantId,
      'merchantKey': cieloMerchantKey
    }
  }

  try {
    return await post( options );
  } catch ( err ) {
    if ( err.message ) {
      throw new Error( `Erro ao fazer a requisição à Cielo: ${err.message}` );
    } else {
      throw new Error( 'Erro ao fazer a requisição à Cielo.' );
    }
  }
}


/**
 * Valida os dados de um cartão através do recurso QueryBIN da Cielo. \
 * Essa função já implementa a validação da bandeira e do tipo de cartão, 
 * retornando a resposta da cielo com esses campos já pré validados.
 * @param dto Formulário de validação Zeroauth da Cielo para cartões.
 */
export async function cieloValidateCardBIN ( dto: CieloValidateCardDto ) {
  let data = await cieloQueryCardBin( dto.CardNumber.substr( 0, 6 ) );

  // validação da Bandeira
  if ( dto.Brand == 'Elo' ) {
    if ( data.Provider != 'ELO' ) {
      throw new Error( `Bandeira do cartão (${data.Provider}) diferente do informado ${dto.Brand}` );
    }
  } else if ( dto.Brand == 'Master' ) {
    if ( data.Provider != 'MASTER' ) {
      throw new Error( `Bandeira do cartão (${data.Provider}) diferente do informado ${dto.Brand}` );
    }
  } else if ( dto.Brand == 'Visa' ) {
    if ( data.Provider != 'VISA' ) {
      throw new Error( `Bandeira do cartão (${data.Provider}) diferente do informado ${dto.Brand}` );
    }
  }


  // validação do tipo de cartão
  if ( dto.CardType == 'CreditCard' ) {
    if ( data.CardType != 'Credito' && data.CardType != 'Multiplo' ) {
      throw new Error( `O cartão informado não possui a modalidade Crédito. Atual: ${data.CardType}` );
    }
  } else if ( dto.CardType == 'DebitCard' ) {
    if ( data.CardType != 'Debito' && data.CardType != 'Multiplo' ) {
      throw new Error( `O cartão informado não possui a modalidade Débito. Atual: ${data.CardType}` );
    }
  }


  // as validações iniciais passaram, então a resposta da cielo é retornada para maiores análises.
  return data;
}



/**
 * Cancela uma venda através de seu ID de transação na Cielo
 * @param paymentId ID de uma transação da Cielo
 */
export async function cieloCancelSale ( paymentId: string ) {
  let options: Options = {
    uri: `${cieloURLRequest}${cieloEndpointForSales}${paymentId}/void`,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Request-Promise',
      'merchantId': cieloMerchantId,
      'merchantKey': cieloMerchantKey
    }
  }
  let res: CieloResponseCaptureInterface = await put( options );
  if ( res.Status != 10 ) {
    throw new Error( `Operação não foi cancelada. ${JSON.stringify( res, null, 2 )}` );
  }
  return res;
}




/**
 * Consulta dados de uma transação específica pelo seu ID na Cielo
 * @param paymentId ID de uma transação da Cielo
 */
export async function cieloGetTransactionData ( paymentId: string ): Promise<CieloSaleResponseInterface> {
  let options: Options = {
    uri: `${cieloURLQuery}${cieloEndpointForSales}${paymentId}/`,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Request-Promise',
      'merchantId': cieloMerchantId,
      'merchantKey': cieloMerchantKey
    }
  }
  return await get( options );
}





/**
 * Consulta BIN da Cielo. Retorna informações úteis para validação 
 * de dados do cartão antes de cadastrar. \
 * É necessário solicitar a 
 * ativação deste recurso com a equipe de suporte da Cielo.
 * @param bin BIN são os 6 primeiros dígitos do cartão.
 */
export async function cieloQueryCardBin ( bin: string ) {

  const options: Options = {
    uri: `${cieloURLQuery}${cieloEndpointForCardBin}${bin}`,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Request-Promise',
      'Merchantid': cieloMerchantId,
      'Merchantkey': cieloMerchantKey
    }
  };

  let res: CieloCardBinResponseInterface;
  try {
    res = await get( options );
  } catch ( err ) {
    if ( err.message ) {
      throw new Error( `Erro ao fazer a requisição à Cielo: ${err.message}` );
    } else {
      throw new Error( 'Erro ao fazer a requisição à Cielo.' );
    }
  }

  if ( res ) {
    if ( res.Status != '00' ) {
      if ( res.Status == '01' ) {
        throw new Error( `Bandeira não suportada. ${res.Provider}` );
      } else if ( res.Status == '02' ) {
        throw new Error( 'Cartão não suportado na consulta de bin' );
      } else if ( res.Status == '73' ) {
        throw new Error( 'Afiliação bloqueada' );
      } else {
        throw new Error( `Status ${res.Status} desconhecido.` );
      }
    }
  } else {
    throw new Error( `Erro desconhecido. Resposta vazia.` );
  }
  return res;
}


/**
 * Captura uma transação
 * @param paymentId ID de uma transação da Cielo
 */
export async function cieloCapture ( paymentId: string ): Promise<CieloResponseCaptureInterface> {
  const options: Options = {
    uri: `${cieloURLRequest}${cieloEndpointForSales}${paymentId}/capture`,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Request-Promise',
      'Merchantid': cieloMerchantId,
      'Merchantkey': cieloMerchantKey
    }
  };

  try {
    return <CieloResponseCaptureInterface>await put( options );
  } catch ( err ) {
    if ( err.message ) {
      throw new Error( `Erro ao fazer a requisição à Cielo: ${err.message}` );
    } else {
      throw new Error( 'Erro ao fazer a requisição à Cielo.' );
    }
  }
}

