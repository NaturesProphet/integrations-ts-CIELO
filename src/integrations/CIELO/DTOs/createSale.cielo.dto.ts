/**
 * formulário para criar uma nova venda na API da Cielo utilizando um token de cartão existente
 */
export class CieloCreateSaleDto {
  /**
   * 	Numero de identificação do pedido no sistema do logista
   */
  MerchantOrderId: string;

  /**
   * Booleano que identifica que a autorização deve ser com captura automática.\
   * Indica se a cobrança será de fato processada ou se trata-se de um teste do cartão.\
   * false = teste.\
   * true = cobrar.
   */
  capture: boolean;

  /**
   * Dados do comprador
   */
  Customer: {
    /**
     * Nome do Comprador.
     */
    Name: string;
  }

  /**
   * Dados do pagamento
   */
  Payment: {
    /**
     * 	Tipo do Meio de Pagamento.
     */
    Type: string;

    /**
     * Valor do Pedido (ser enviado em centavos).
     */
    Amount: number;

    /**
     * Número de Parcelas.
     */
    Installments: number;

    /**
     * Texto que será impresso na fatura bancaria do portador\
     * ( Disponivel apenas para VISA e MASTER ). \
     * Não permite caracteres especiais
     */
    SoftDescriptor?: string;

    /**
     * Dados do cartão
     */
    CreditCard: {
      /**
       * Token de identificação do Cartão.
       */
      CardToken: string;

      /**
       * CVV
       */
      SecurityCode: string;

      /**
       * Bandeira do cartão.
       */
      Brand: 'Visa' | 'Master' | 'Amex' | 'Elo' | 'Aura' | 'JCB' | 'Diners' | 'Discover';
    }
  }
}

