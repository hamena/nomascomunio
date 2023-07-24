import BiwengerApi from '../api/biwengerapi.js';
import { IApiOffer, IApiSale } from '../api/market.api.interface.js';

export default class MarketModel {
  private readonly bwapi: BiwengerApi;

  private balance = 0;
  private maxBid = 0;
  private sales: IApiSale[] = [];
  private offers: IApiOffer[] = [];

  constructor(bwapi: BiwengerApi) {
    this.bwapi = bwapi;
  }

  async fetch() {
    console.info('Fetching market info...');
    const marketInfoResp = await this.bwapi.getMarketInfo();
    this.balance = marketInfoResp.status.balance;
    this.maxBid = marketInfoResp.status.maximumBid;
    this.sales = marketInfoResp.sales;
    this.offers = marketInfoResp.offers;
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
