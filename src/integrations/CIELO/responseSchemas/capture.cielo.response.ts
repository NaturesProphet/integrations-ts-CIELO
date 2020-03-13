import { CieloResponseLinkInterface } from './links.cielo.response';

export interface CieloResponseCaptureInterface {
  /**
 * Status da Transação. \
 * 0 - (NotFinished) Aguardando atualização de status. ALL \
 * 1 - (Authorized)  Pagamento apto a ser capturado ou definido como pago. ALL \
 * 2 - (PaymentConfirmed) Pagamento confirmado e finalizado. ALL \
 * 3 - (Denied) Pagamento negado por Autorizador. 	CC + CD + TF \
 * 10 - (voided) Pagamento cancelado. 	ALL \
 * 11 - (Refunded) Pagamento cancelado após 23:59 do dia de autorização. CC + CD\
 * 12 - (Pending) Aguardando Status de instituição financeira. 	ALL\
 * 13 - (Aborted) Pagamento cancelado por falha no processamento ou por ação do AF. ALL\
 * 20 - (Scheduled) Recorrência agendada. CC
 */
  Status: number;

  /**
 * reasoNCode / ReasonMessage: \
  0	Successful. \
  1	AffiliationNotFound. \
  2	IssuficientFunds. \
  3	CouldNotGetCreditCard. \
  4	ConnectionWithAcquirerFailed. \
  5	InvalidTransactionType. \
  6	InvalidPaymentPlan. \
  7	Denied. \
  8	Scheduled. \
  9	Waiting. \
  10	Authenticated. \
  11	NotAuthenticated. \
  12	ProblemsWithCreditCard. \
  13	CardCanceled. \
  14	BlockedCreditCard. \
  15	CardExpired. \
  16	AbortedByFraud. \
  17	CouldNotAntifraud. \
  18	TryAgain. \
  19	InvalidAmount. \
  20	ProblemsWithIssuer. \
  21	InvalidCardNumber. \
  22	TimeOut. \
  23	CartaoProtegidoIsNotEnabled. \
  24	PaymentMethodIsNotEnabled. \
  98	InvalidRequest. \
  99	InternalError
 */
  ReasonCode: number;
  ReasonMessage: string;

  /**
   * Código de retorno do Provider.
   */
  ProviderReturnCode: string;

  /**
   * Mensagem de retorno do Provider.
   */
  ProviderReturnMessage: string;

  /**
   * Código de retorno da Adquirência. \
   * 4 - operação realizada mas não capturada. \
   * 6 - operação capturada. \
   * 05 - Não autorizada. \
   * 57 - Cartão expirado. \
   * 70 - Problemas com o cartão. \
   * 77 - Cartão cancelado. \
   * 78 - Cartão bloqueado. \
   * 99 - Time out ou sucesso (WTF!?!?!?)
   */
  ReturnCode: string;


  ReturnMessage: string;

  /**
  * 	Id da transação na adquirente.
  */
  Tid: string;

  /**
  * Número da autorização, identico ao NSU.
  */
  ProofOfSale: string;

  /**
  * 	Código de autorização.
  */
  AuthorizationCode: string;


  Links: CieloResponseLinkInterface[];
}
