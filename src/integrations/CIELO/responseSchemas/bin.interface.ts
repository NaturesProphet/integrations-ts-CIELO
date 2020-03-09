/**
 * Contrato da resposta da validação de BIN da Cielo
 */
export interface CieloCardBinResponseInterface {

  /**
   * Status da requisição de análise de Bins: \
    00 – Analise autorizada \
    01 – Bandeira não suportada \
    02 – Cartão não suportado na consulta de bin \
    73 – Afiliação bloqueada
   */
  Status: string;

  /**
   * Bandeira do cartão
   */
  Provider: string;

  /**
   * Tipo do cartão em uso : \
    Crédito \
    Débito \
    Multiplo
   */
  CardType: string;

  /**
   * Se o cartão é emitido no exterior (False/True)
   */
  ForeignCard: boolean;

  /**
   * 	Se o cartão é corporativo (False/True)
   */
  CorporateCard: boolean;

  /**
   * 	Nome do emissor do cartão
   */
  Issuer: string;

  /**
   * Código do emissor do cartão
   */
  IssuerCode: string;

}