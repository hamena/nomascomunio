/* eslint-disable @typescript-eslint/no-explicit-any */
import bwapi from '../api/api';

export default class TeamModel {
  private players = [];
  private lineup = [];

  constructor() {}

  async fetch() {
    console.info('Fetching team info...');
    const teamInfoResp = await bwapi.getTeamInfo();
    this.players = teamInfoResp.data.data.players.map((player: any) => player.id);
    this.lineup = teamInfoResp.data.data.lineup.playersID;
  }

  getPlayers() {
    return this.players.slice();
  }

  getCoach() {
    // TODO: get coach
  }

  getLineup() {
    return this.lineup.slice();
  }
}
