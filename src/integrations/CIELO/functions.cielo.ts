import { CieloCreateCardDto } from "./DTOs/createCard.cielo.dto";
import { CieloResponseCreateCardInterface } from './responseSchemas/createCard.response.cielo';
import { CieloCreateSaleDto } from './DTOs/createSale.cielo.dto';
import { CieloResponseCreateSaleInterface } from './responseSchemas/createSale.cielo.response';
import { post, put, get, Options } from 'request-promise';
import { CieloZeroauthValidationDto } from './DTOs/zeroauth.cielo.dto';
import {
  cieloURLRequest, cieloEndpointForCards, cieloURLQuery,
  cieloMerchantId, cieloMerchantKey, cieloEndpointForSales, cieloEndpointForZeroauthValidation, cieloEndpointForCardBin
} from '../../common/configs/cielo.config';

import { CieloFullResponseInterface } from './responseSchemas/fullResponse.cielo.response';
import { CieloCardBinResponseInterface } from './responseSchemas/bin.interface';

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

  switch ( paymentData.Payment.ReturnCode ) {
    case '4':
      return paymentData;
      break;

    case '05':
      throw new Error( `Não Autorizado` );
      break;

    case '6':
      return paymentData;
      break;

    case '57':
      throw new Error( `Cartão Expirado` );
      break;

    case '70':
      throw new Error( `Problemas com o Cartão de Crédito! `
        + `Verifique os dados. Se o problema persistir, `
        + `contate a sua administradora do cartão` );
      break;

    case '77':
      throw new Error( `Cartão Cancelado` );
      break;

    case '78':
      throw new Error( `Cartão Bloqueado` );
      break;

    case '99':
      if ( paymentData.Payment.ReturnMessage == 'Time Out'
        || paymentData.Payment.ReturnMessage == 'Timed Out' ) {
        throw new Error( `Time Out. Tente novamente daqui a pouco` );
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
          + `Cielo ReturnMessage: ${paymentData.Payment} `
          + `Cielo Status: ${paymentData.Payment.Status}` );
      }
      else {
        throw new Error( `Erro inesperado ao processar pagamento.` );
      }
      break;
  }
}



/**
 * Valida os dados de um cartão através do recurso Zeroauth da Cielo. \
 * Necessário cadastro requisitando o recurso Zeroauth
 * @param dto Formulário de validação Zeroauth da Cielo para cartões.
 */
export async function cieloValidateCard ( dto: CieloZeroauthValidationDto ) {
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
  let res = await put( options );
  if ( res.Status != 10 ) {
    throw new Error( `Operação não foi cancelada. ${JSON.stringify( res, null, 2 )}` );
  }
  return res;
}




/**
 * Consulta dados de uma transação específica pelo seu ID na Cielo
 * @param paymentId ID de uma transação da Cielo
 */
export async function cieloGetTransactionData ( paymentId: string ): Promise<CieloFullResponseInterface> {
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
    uri: `${cieloURLRequest}${cieloEndpointForCardBin}${bin}`,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Request-Promise',
      'Merchantid': cieloMerchantId,
      'Merchantkey': cieloMerchantKey
    }
  };

  try {
    let res: CieloCardBinResponseInterface = await get( options );
    return res;
  } catch ( err ) {
    if ( err.message ) {
      throw new Error( `Erro ao fazer a requisição à Cielo: ${err.message}` );
    } else {
      throw new Error( 'Erro ao fazer a requisição à Cielo.' );
    }
  }
}


/**
 * Captura uma transação
 * @param paymentId ID de uma transação da Cielo
 */
export async function cieloCapture ( paymentId: string ) {
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
    let res = await put( options );
    return res;
  } catch ( err ) {
    if ( err.message ) {
      throw new Error( `Erro ao fazer a requisição à Cielo: ${err.message}` );
    } else {
      throw new Error( 'Erro ao fazer a requisição à Cielo.' );
    }
  }
}

