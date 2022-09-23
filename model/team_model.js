import bwapi from '../api/api.js'

class TeamModel {

  #players = []
  #lineup = []

  constructor() {}

  async fetch() {
    console.info('Fetching team info...')
    const teamInfoResp = await bwapi.getTeamInfo()
    this.#players = teamInfoResp.data.data.players.map(player => player.id)
    this.#lineup = teamInfoResp.data.data.lineup.playersID
  }

  getPlayers() {
    return this.#players.slice()
  }

  getCoach() {
    // TODO: get coach
  }

  getLineup() {
    return this.#lineup.slice()
  }

}

const teamModel = new TeamModel()
export default teamModel
