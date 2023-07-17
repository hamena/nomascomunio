import bwapi from "../api/api.js"

class LeagueModel {
  
  #players
  #rounds

  constructor() {}

  async fetch() {
    console.info('Fetching La Liga info...')
    const response = await bwapi.getLaLigaInfo()
    this.#players = response.data.data.players
    this.#rounds = response.data.data.season.rounds
  }

  getPlayers() {
    return this.#players
  }

  getPlayer(playerid) {
    return this.#players[playerid]
  }

  getRounds() {
    return this.#rounds
  }

  getRound(index) {
    return this.#rounds[index]
  }

  getNextRound() {
    return this.#rounds.filter(round => round.status === 'pending')[0] 
  }

}

const leagueModel = new LeagueModel()
export default leagueModel
