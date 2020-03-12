import { CieloCustomer } from '../class/customer.cieloclass';
import { CieloPayment } from '../class/abstract/payment.cieloclass';

/**
 * formulário para criar uma nova venda na API da Cielo utilizando um token de cartão existente
 */
export class CieloCreateSaleDto {
  /**
   * 	Numero de identificação do pedido no sistema do logista
   */
  MerchantOrderId: string;

  /**
   * Dados do comprador
   */
  Customer: CieloCustomer;

  /**
   * Dados genéricos de compra
   */
  Payment: CieloPayment;
}

