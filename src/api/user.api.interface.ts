import { IApiOffer } from './market.api.interface.js';

export interface IApiLineup {
  readonly type: string;
  readonly date: number;
  readonly playersID: number[];
}

export interface IApiPlayerOnSale {
  // Representation for data.market when GET api/v2/user
  readonly date: number;
  readonly until: number;
  readonly type: string;
  readonly playerID: number;
  readonly price: number;
}

export default interface IApiUser {
  readonly id: number;
  readonly name: string;
  readonly role: string;
  readonly points: number;
  readonly balance: number;

  readonly lineup: IApiLineup;
  readonly market: IApiPlayerOnSale;
  readonly offers: IApiOffer[];
  readonly players: { readonly id: number }[];
}
