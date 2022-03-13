const config = require("./config")
const { getLaLiga } = require("./laliga")
const { getMarket } = require("./market")
const { postLogin, getAccount } = require("./user")
const calc = require("../util/calc")

module.exports.leagueName = ""

module.exports.seasonName = ""

module.exports.teams = []

module.exports.players = []

module.exports.market = {
  balance: -1,
  maximumBid: -1,
  sales: [],
  offers: [],
  loans: []
}

module.exports.login = async () => {

  if (!process.env.BIWENGER_EMAIL || !process.env.BIWENGER_PASSWORD) {
    throw Error("BIWENGER_EMAIL and BIWENGER_PASSWORD environment variables must be set!")
  } 

  const loginData = await postLogin(process.env.BIWENGER_EMAIL, process.env.BIWENGER_PASSWORD)
  config.jwt = loginData.token

  const accountData = await getAccount()
  const leagueData = accountData.data.leagues.filter(league => league.name === config.leagueName)[0]
  config.version = accountData.data.version
  config.lang = accountData.data.account.locale
  config.league = leagueData.id
  config.user = leagueData.user.id
}

module.exports.fetch = async () => {
  const laLiga = await getLaLiga()
  this.leagueName = laLiga.data.name
  this.seasonName = laLiga.data.season.name
  this.teams = laLiga.data.teams
  this.players = laLiga.data.players

  const market = await getMarket()
  this.market.balance = market.data.status.balance
  this.market.maximumBid = market.data.status.maximumBid
  this.market.sales = market.data.sales
  this.market.offers = market.data.offers
  this.market.loans = market.data.loans

  // console.info(this.market.balance)
  // console.info(this.market.maximumBid)
  // console.info(this.market.sales)
  // console.info(this.market.offers)
  // console.info(this.market.loans)
}

module.exports.process = () => {
  const playersArray = Object.values(this.players).map(player => {
    player.fitnessValue = calc.fitnessValue(player)
    player.nMatchesPlayed = calc.nMatchesPlayed(player)
    player.pointsPerMatch = calc.pointsPerMatch(player)
    return player
  })
  playersArray.forEach(player => this.players[player.id] = player)
  this.market.sales = this.market.sales.map(sale => {
    sale.player = this.players[sale.player.id]
    return sale
  })
}
