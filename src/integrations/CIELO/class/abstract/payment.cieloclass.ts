export abstract class CieloPayment {

  /**
   * 	Tipo do Meio de Pagamento.
   */
  Type: 'CreditCard' | 'DebitCard';

  /**
   * Valor do Pedido (ser enviado em centavos).
   */
  Amount: number;

  /**
   * Número de Parcelas.
   */
  Installments: number;

  /**
   * Deve ser enviado com valor “true” caso se trate de 
   * uma transação de compra ou venda de Criptomoeda. \
   * Default: false
   */
  IsCryptoCurrencyNegotiation?: boolean;

  /**
   * Definir 'SIMULADO' ao usar no SandBox
   */
  Provider?: string;

  /**
   * Texto que será impresso na fatura bancaria do portador\
   * ( Disponivel apenas para VISA e MASTER ). \
   * Não permite caracteres especiais
   */
  SoftDescriptor?: string;

  /**
   * Moeda na qual o pagamento será feito (BRL).
   */
  Currency?: 'BRL';

  /**
   * Pais na qual o pagamento será feito.
   */
  Country?: 'BRA';

  /**
   * Aplicável apenas para empresas aéreas. \
   * Montante do valor da autorização que deve ser destinado à taxa de serviço. \
   * Obs.: Esse valor não é adicionado ao valor da autorização.
   */
  ServiceTaxAmount?: number;

  /**
   * Tipo de parcelamento. \
   * Loja (ByMerchant) ou Cartão (ByIssuer).
   */
  Interest?: 'ByMerchant' | 'ByIssuer';

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


}
