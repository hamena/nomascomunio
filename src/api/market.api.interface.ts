export interface IApiSale {
  readonly date: number;
  readonly until: number;
  readonly price: number;
  readonly player: { id: number };
  readonly user: number | null;
}

export interface IApiOffer {
  // TODO interface IOffer
}

export default interface IApiMarket {
  readonly status: { readonly balance: number; readonly maximumBid: number };
  readonly sales: IApiSale[];
  readonly offers: IApiOffer[];
}
