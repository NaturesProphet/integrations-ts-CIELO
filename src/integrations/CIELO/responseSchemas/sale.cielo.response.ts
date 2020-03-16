import { CieloResponseLinkInterface } from "./links.cielo.response";
import { CieloCustomer } from '../class/customer.cieloclass';

/**
 * Interface expondo todos os campos possíveis que a API da cielo pode retornar.\
 * Disponível em https://developercielo.github.io/manual/
 */
export interface CieloSaleResponseInterface {
  /**
   * 	Numero de identificação do Pedido.
   */
  MerchantOrderId: string;

  /**
   * Dados do cliente
   */
  Customer: CieloCustomer

  Payment?: {
    /**
     * Aplicável apenas para empresas aéreas. \
     * Montante do valor da autorização que deve ser destinado à taxa de serviço. \
     * Obs.: Esse valor não é adicionado ao valor da autorização.
     */
    ServiceTaxAmount?: number;

    /**
     * número de parcelas
     */
    Installments?: number;

    /**
     * 	Tipo de parcelamento \
     *  Loja (ByMerchant) ou Cartão (ByIssuer).
     */
    Interest?: string;

    /**
   * Booleano que identifica que a autorização deve ser com captura automática.\
   * Indica se a cobrança será de fato processada ou se trata-se de um teste do cartão.\
   * false = teste.\
   * true = cobrar.
   */
    Capture?: boolean;

    /**
     * Define se o comprador será direcionado ao Banco emissor para autenticação do cartão
     */
    Authenticate?: boolean;

    CreditCard?: {
      /**
     * número do cartão
     */
      CardNumber?: string;

      /**
     * Nome impresso no cartão
     */
      Holder?: string;

      /**
       * data de expiração no formato MM/YYYY
       */
      ExpirationDate?: string;

      /**
       * Booleano que identifica se o cartão será salvo para gerar o CardToken.
       */
      SaveCard?: boolean;

      /**
       * 	Bandeira do cartão \
       * (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).
       */
      Brand?: string;

      /**
       * O PAR(payment account reference) é o número que associa diferentes tokens 
       * a um mesmo cartão. Será retornado pelas bandeiras Master e Visa e repassado 
       * para os clientes do e-commerce Cielo. Caso a bandeira não envie a informação 
       * o campo não será retornado.
       */
      PaymentAccountReference?: string;

      CardOnFile?: {
        /**
        * First se o cartão foi armazenado e é seu primeiro uso.\
        * Used se o cartão foi armazenado e ele já foi utilizado anteriormente em outra transação
        */
        Usage?: string;

        /**
         * Condicional. \
         * Indica o propósito de armazenamento de cartões, caso o campo “Usage” for “Used”.\
         * Recurring - Compra recorrente programada (ex. assinaturas)\
         * Unscheduled - Compra recorrente sem agendamento (ex. aplicativos de serviços)\
         * Installments - Parcelamento através da recorrência\
         */
        Reason?: string;
      }
    },

    /**
     * Deve ser enviado com valor “true” caso se trate de uma transação
     *  de compra ou venda de Criptomoeda
     */
    IsCryptoCurrencyNegotiation?: boolean;

    /**
     * Caso ocorra algum erro durante a autorização (status Não Finalizada - “0”), 
     * a resposta incluirá o campo “tryautomaticcancellation” como true.
     * Neste caso, a transação será sondada automaticamente, 
     * e caso tenha sido autorizada será cancelada automaticamente. 
     * Esta funcionalidade deverá estar habilitada para loja. 
     * Para habilitar, entre em contato com o nosso suporte técnico.
     */
    tryautomaticcancellation?: boolean;

    /**
     * Número da autorização, identico ao NSU.
     */
    ProofOfSale?: string;

    /**
     * 	Id da transação na adquirente.
     */
    Tid?: string;

    /**
     * Código de autorização.
     */
    AuthorizationCode?: string;

    /**
     * Texto que será impresso na fatura bancaria do portador.\
     * Disponivel apenas para VISA/MASTER\
     * nao permite caracteres especiais
     */
    SoftDescriptor?: string;

    /**
     * 	Campo Identificador do Pedido.
     */
    PaymentId?: string;

    /**
     * Tipo de pagamento (crédito/débito). \
     * DebitCard \
     * CreditCard
     */
    Type?: string;

    /**
     * Valor EM CENTAVOS do pagamento
     */

    Amount?: number;

    /**
     * Não documentado. q porra será essa O_o ??
     */
    CapturedAmount?: number;

    /**
     * País. Default é sempre BRA por enquanto.
     */
    Country?: string;


    AirlineData?: {
      /**
       * 	Informar o número do principal bilhete aéreo da transação.
       */
      TicketNumber?: string;
    },

    /**
     * Não documentado. q porra será essa O_o ??
     */
    ExtraDataCollection?: [],

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
    Status?: number;

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
    ReturnCode?: string;

    /**
     * Mensagem de retorno da Adquirência.
     */
    ReturnMessage?: string;

    /**
     * Não documentado. \
     * Aparentemente trata-se de uma lista de ações qe podem ser executadas
     * via REST com os dados da transação atual.
     */
    Links?: CieloResponseLinkInterface[]
  },

  /**
   * Eletronic Commerce Indicator. Representa o quão segura é uma transação.
   */
  ECI: string;
}
