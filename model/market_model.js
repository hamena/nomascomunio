import bwapi from '../api/api.js'

class MarketModel {

  #balance = 0
  #maxBid = 0
  #sales = []
  #offers = []

  constructor() {}

  async fetch() {
    console.info('Fetching market info...')
    const marketInfoResp = await bwapi.getMarketInfo()
    this.#balance = marketInfoResp.data.data.status.balance
    this.#maxBid = marketInfoResp.data.data.status.maximumBid
    this.#sales = marketInfoResp.data.data.sales
    this.#offers = marketInfoResp.data.data.offers
  }

  getBalance() {
    return this.#balance
  }

  getMaxBid() {
    return this.#maxBid
  }

  getSales() {
    return this.#sales
  }

  getOffers() {
    return this.#offers
  }

}

const marketModel = new MarketModel()
export default marketModel
