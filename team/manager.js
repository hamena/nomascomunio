import * as dotenv from 'dotenv'
dotenv.config()

const myUserId = Number(process.env.USER_ID)

class Manager {

  #leagueModel
  #marketModel

  #analyst

  #maxBid = 0
  #currentBalance = 0
  #marketSales = []
  #marketOffers = []

  #mySales = []
  #myOffers = []
  #myBids = []

  #toSell = []
  #toAccept = []
  #toReject = []
  #toBid = []

  constructor (leagueModel, marketModel, analyst) {
    this.#leagueModel = leagueModel
    this.#marketModel = marketModel
    this.#analyst = analyst
    this.refresh()
  }

  refresh() {
    this.#currentBalance = this.#marketModel.getBalance()
    this.#maxBid = this.#marketModel.getMaxBid()
    this.#marketSales = []
    this.#mySales = []
    this.#marketModel.getSales().forEach(sale => {
      sale.player = this.#leagueModel.getPlayer(sale.player.id)
      if (sale.user?.id === myUserId) {
        this.#mySales.push(sale)
      } else {
        this.#marketSales.push(sale)
      }
    })
    this.#marketOffers = []
    this.#myOffers = []
    this.#myBids = []
    this.#marketModel.getOffers().forEach(offer => {
      offer.player = this.#leagueModel.getPlayer(offer.requestedPlayers[0])
      if (offer.to?.id === myUserId && offer.type === 'purchase' && offer.status === 'waiting') {
        this.#myOffers.push(offer)
      } else if (offer.from?.id === myUserId && offer.type === 'purchase' && offer.status === 'waiting') {
        this.#myBids.push(offer)
      } else {
        this.#marketOffers.push(offer)
      }
    })
  }

  critics(lineup) {
    console.info('###### MARKET INFO ######')
    console.info('Balance:', this.#currentBalance, 'Max bid:', this.#maxBid)
    
    console.info(' --- My sales ---')
    console.info(this.#mySales.map(sale => { 
      this.#analyst.evalPlayer(sale.player)
      return sale
    }))
    console.info(' --- My offers ---')
    console.info(this.#myOffers.map(offer => {
      this.#analyst.evalPlayer(offer.player)
      return offer
    }))
    console.info(' --- My bids ---')
    console.info(this.#myBids.map(bid => {
      this.#analyst.evalPlayer(bid.player)
      return bid
    }))
    
    console.info(' --- Market sales ---')
    console.info(this.#marketSales.map(sale => {
      this.#analyst.evalPlayer(sale.player)
      return sale
    }))
    console.info(' --- Market offers ---')
    console.info(this.#marketOffers.map(offer => {
      this.#analyst.evalPlayer(offer.player)
      return offer
    }))
    console.info('#########################')

    console.info(lineup)

    // P0 alineados
    var patchPlayers = []
    // P0 sobrantes
    var uselessPlayers = []
    // nulls en lineup
    var nullCritics = {
      keepers: 0,
      defenders: 0,
      midFielders: 0,
      forwards: 0
    }

    // 1. Aceptar ofertas P0 sobrantes
    // 2. Cubrir nulls
    // 3. Swap P0 alineados <-> market (P/€)
    // 4. Vender P0 sobrantes

    // 1.
    // const offersPerUselessPlayer = []
    // this.#myOffers.forEach(myOffer => {
    //   if (uselessPlayers.includes(myOffer.player.id)) {
    //     if (offersPerUselessPlayer[myOffer.player.id]) {
    //       offersPerUselessPlayer[myOffer.player.id] = []
    //     }
    //     offersPerUselessPlayer[myOffer.player.id].push(myOffer)
    //   }
    // })
    // Object.keys(offersPerUselessPlayer).forEach(playerid => {
    //   uselessPlayerOffers[playerid].sort((a, b) => b.amount - a.amount)
    //   this.#toAccept.push(uselessPlayerOffers[playerid][0].id)
    // })

    // // 2.
    // const marketKeepers = this.#marketSales.filter(sale => sale.player.position === playerPositions.keeper).sort((p1, p2) => p2.qualityRatio - p1.qualityRatio).slice(0, nullCritics.keepers)
    // const marketDefenders = this.#marketSales.filter(sale => sale.player.position === playerPositions.defender).sort((p1, p2) => p2.qualityRatio - p1.qualityRatio).slice(0, nullCritics.defenders)
    // const marketMidFielders = this.#marketSales.filter(sale => sale.player.position === playerPositions.midfielder).sort((p1, p2) => p2.qualityRatio - p1.qualityRatio).slice(0, nullCritics.midFielders)
    // const marketForwards = this.#marketSales.filter(sale => sale.player.position === playerPositions.forward).sort((p1, p2) => p2.qualityRatio - p1.qualityRatio).slice(0, nullCritics.forwards)
    // const candidates = [...marketKeepers, ...marketDefenders, ...marketMidFielders, ...marketForwards].sort((p1, p2) => p2.qualityRatio - p1.qualityRatio)
    // // pujar por candidates

    // // 3.
    // const swapCandidates = []
    // patchPlayers.forEach(patchPlayer => {
    //   patchPlayer.swap = true
    // })


    // 4.
    // uselessPlayers.filter(player => this.#toAccept(player.id)).forEach(patch => {
    //   // sell patch
    // })
  }

  improve() {

  }

  speculate() {

  }

}

export default Manager
