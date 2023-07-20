import BiwengerApi from '../api/api.js';
import IPlayer from '../team/player.js';

export default class MarketModel {
  private readonly bwapi: BiwengerApi;

  private balance = 0;
  private maxBid = 0;
  private sales: ISale[] = [];
  private offers: IOffer[] = [];

  constructor(bwapi: BiwengerApi) {
    this.bwapi = bwapi;
  }

  async fetch() {
    console.info('Fetching market info...');
    const marketInfoResp = await this.bwapi.getMarketInfo();
    this.balance = marketInfoResp.data.data.status.balance;
    this.maxBid = marketInfoResp.data.data.status.maximumBid;
    this.sales = marketInfoResp.data.data.sales;
    this.offers = marketInfoResp.data.data.offers;
  }

  getBalance() {
    return this.balance;
  }

  getMaxBid() {
    return this.maxBid;
  }

  getSales() {
    return this.sales;
  }

  getOffers() {
    return this.offers;
  }
}

export interface ISale {
  player: IPlayer;
  user: { id: number };
}

export interface IOffer {
  player: IPlayer;
  to: { id: number };
  from: { id: number };
  type: string;
  status: string;
  requestedPlayers: number[];
}
