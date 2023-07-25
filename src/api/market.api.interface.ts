export interface IApiSale {
  readonly date: number;
  readonly until: number;
  readonly price: number;
  readonly player: { readonly id: number };
  readonly user: number | null;
}

export interface IApiOffer {
  readonly id: number;
  readonly amount: number;
  readonly status: string;
  readonly type: string;
  readonly from: { readonly id: number } | null;
  readonly to: { readonly id: number };
  readonly requestedPlayers: number[];
}

export default interface IApiMarket {
  readonly status: { readonly balance: number; readonly maximumBid: number };
  readonly sales: IApiSale[];
  readonly offers: IApiOffer[];
}
