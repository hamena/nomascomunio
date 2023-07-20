/* eslint-disable @typescript-eslint/no-explicit-any */
import BiwengerApi from '../api/api.js';
import IPlayer from '../team/player.js';

export default class LeagueModel {
  private readonly bwapi: BiwengerApi;

  private players: IPlayer[] = [];
  private rounds: any;

  constructor(bwapi: BiwengerApi) {
    this.bwapi = bwapi;
  }

  async fetch() {
    console.info('Fetching La Liga info...');
    const response = await this.bwapi.getLaLigaInfo();
    this.players = response.data.data.players;
    this.rounds = response.data.data.season.rounds;
  }

  getPlayers() {
    return this.players;
  }

  getPlayer(playerid: number) {
    return this.players[playerid];
  }

  getRounds() {
    return this.rounds;
  }

  getRound(index: number) {
    return this.rounds[index];
  }

  getNextRound() {
    return this.rounds.filter((round: any) => round.status === 'pending')[0];
  }
}
