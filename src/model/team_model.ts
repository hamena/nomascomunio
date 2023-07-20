/* eslint-disable @typescript-eslint/no-explicit-any */
import BiwengerApi from '../api/api.js';

export default class TeamModel {
  private readonly bwapi: BiwengerApi;

  private players = [];
  private lineup = [];

  constructor(bwapi: BiwengerApi) {
    this.bwapi = bwapi;
  }

  async fetch() {
    console.info('Fetching team info...');
    const teamInfoResp = await this.bwapi.getTeamInfo();
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
