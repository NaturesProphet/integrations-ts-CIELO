import { CieloAddress } from "./address.cieloclass";

export class CieloCustomer {
  /**
   * Nome do Comprador.
   */
  Name: string;

  /**
  * CPF do cliente
  */
  Identity?: string;

  /**
   * sempre definir como CPF
   */
  IdentityType?: 'CPF';

  /**
   * email do cliente
   */
  Email?: string;

  /**
   * Aniversário do cliente
   */
  Birthdate?: Date;

  Address?: CieloAddress;

  DeliveryAddress?: CieloAddress;
}
