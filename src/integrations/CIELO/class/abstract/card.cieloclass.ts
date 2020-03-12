export abstract class CieloCard {

  /**
   * CVV
   */
  SecurityCode: string;

  /**
   * Bandeira do cartão.
   */
  Brand: 'Visa' | 'Master' | 'Amex' | 'Elo' | 'Aura' | 'JCB' | 'Diners' | 'Discover';


  /**
   * Booleano que identifica se o cartão será salvo para gerar o CardToken.
   */
  SaveCard?: boolean;


  CardOnFile?: {
    /**
     * First se o cartão foi armazenado e é seu primeiro uso. \
     * Used se o cartão foi armazenado e ele já foi utilizado anteriormente em outra transação
     */
    Usage: 'First' | 'Used',

    /**
     * Indica o propósito de armazenamento de cartões, caso o campo “Usage” for “Used”. \
     * Recurring - Compra recorrente programada (ex. assinaturas). \
     * Unscheduled - Compra recorrente sem agendamento (ex. aplicativos de serviços). \
     * Installments - Parcelamento através da recorrência
     */
    Reason: string
  }

}

