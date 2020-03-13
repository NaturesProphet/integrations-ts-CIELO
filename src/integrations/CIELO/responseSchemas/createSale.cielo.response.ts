import { CieloResponseCreateCardInterface } from "./createCard.response.cielo";

/**
 * Modelo da resposta enviada pela API da Cielo ao criar uma nova venda utilizando cardtoken
 */
export interface CieloResponseCreateSaleInterface {

  /**
   * 	Numero de identificação do pedido no sistema do logista
   */
  MerchantOrderId: string;

  /**
   * Dados do comprador
   */
  Customer: {
    /**
   * Nome do Comprador.
   */
    Name: string;
  },

  Payment: {
    /**
   * Aplicável apenas para empresas aéreas. \
   * Montante do valor da autorização que deve ser destinado à taxa de serviço. \
   * Obs.: Esse valor não é adicionado ao valor da autorização.
   */
    ServiceTaxAmount: number;

    /**
     * Número de Parcelas.
     */
    Installments: number;

    /**
     * 	Tipo de parcelamento \
     *  Loja (ByMerchant) ou Cartão (ByIssuer).
     */
    Interest: 'ByMerchant' | 'ByIssuer' | 0;

    /**
     * Booleano que identifica que a autorização deve ser com captura automática.\
     * Indica se a cobrança será de fato processada ou se trata-se de um teste do cartão.\
     * false = teste.\
     * true = cobrar.
     */
    Capture: boolean;

    /**
     * 	Define se o comprador será direcionado ao Banco emissor 
     *  para autenticação do cartão (Default false)
     */
    Authenticate: boolean;


    CreditCard: {
      /**
     * Booleano que identifica se o cartão foi salvo para gerar um CardToken.
     */
      SaveCard: boolean

      /**
       * Token de identificação do Cartão. \
       * Exemplos para testes no sandbox: \
       * Autorizado: 6fb7a669aca457a9e43009b3d66baef8bdefb49aa85434a5adb906d3f920bfeA \
       * Negado: 6fb7a669aca457a9e43009b3d66baef8bdefb49aa85434a5adb906d3f920bfeB
       */
      CardToken: string;

      /**
       * Bandeira do cartão
       */
      Brand: string;
    },
    /**
     * Número da autorização, identico ao NSU.
     */
    ProofOfSale: string;

    /**
     * 	Id da transação na adquirente.
     */
    Tid: string;

    /**
     * 	Código de autorização.
     */
    AuthorizationCode: string;

    /**
     * Texto que será impresso na fatura bancaria do portador. \
     * Disponivel apenas para VISA/MASTER. \
     * Nao permite caracteres especiais
     */
    SoftDescriptor: string;

    /**
     * Campo Identificador do Pedido.	
     */
    PaymentId: string;


    Type: 'CreditCard';

    /**
     * Valor do Pedido (em centavos).
     */
    Amount: number;

    /**
     * Moeda. padrão é sempre BRL por enquanto.
     */
    Currency: 'BRL',

    /**
   * País. Default é sempre BRA por enquanto.
   */
    Country: 'BRA';

    /**
   * Não documentado. q porra será essa O_o ??
   */
    ExtraDataCollection: [],

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


    /**
     * Mensagem de retorno da Adquirência.
     */
    ReturnMessage: string;


    /**
   * Indica se a cobrança será repetida. deixar em FALSE
   */
    Recurrent: boolean;

    /**
   * Provedor da transação.
   * 'Cielo' para produção.
   * 'SIMULADO' para sandbox.
   */
    Provider: string;


    IsQrCode: string;


    ReceivedDate: string;


    IsSplitted: boolean;


    /**
     * Quando a compra é feita no débito, o usuário deverá ser redirecionado para esta URL
     * para poder concluir a compra.
     */
    AuthenticationUrl?: string;



    /**
     * Não documentado. \
     * Aparentemente trata-se de uma lista de ações qe podem ser executadas
     * via REST com os dados da transação atual.
     */
    Links: CieloResponseCreateCardInterface[]
  }
}

