/* eslint-disable @typescript-eslint/no-explicit-any */
import BiwengerApi from '../api/biwengerapi.js';
import IPlayer from '../team/player.js';
import { IApiRound } from '../api/competition.api.interface.js';

export default class LeagueModel {
  private readonly bwapi: BiwengerApi;

  private players: IPlayer[] = [];
  private rounds: IApiRound[] = [];

  constructor(bwapi: BiwengerApi) {
    this.bwapi = bwapi;
  }

  async fetch() {
    console.info('Fetching La Liga info...');
    const response = await this.bwapi.getLaLigaInfo();
    this.players = Object.values(response.players) as IPlayer[];
    this.rounds = response.season.rounds;
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
