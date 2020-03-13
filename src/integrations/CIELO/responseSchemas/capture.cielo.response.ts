import { CieloResponseLinkInterface } from './links.cielo.response';

export interface CieloResponseCaptureInterface {
  Status: number;
  ReasonCode: number;
  ReasonMessage: string;
  ProviderReturnCode: string;
  ProviderReturnMessage: string;
  ReturnCode: string;
  ReturnMessage: string;
  Tid: string;
  ProofOfSale: string;
  AuthorizationCode: string;
  Links: CieloResponseLinkInterface[];
}
