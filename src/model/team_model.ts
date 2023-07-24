import BiwengerApi from '../api/biwengerapi.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class TeamModel {
  private readonly bwapi: BiwengerApi;

  private players: number[] = [];
  private lineup: number[] = [];

  constructor(bwapi: BiwengerApi) {
    this.bwapi = bwapi;
  }

  async fetch() {
    console.info('Fetching team info...');
    const teamInfoResp = await this.bwapi.getTeamInfo();
    this.players = teamInfoResp.players.map((player) => player.id);
    this.lineup = teamInfoResp.lineup.playersID;
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
