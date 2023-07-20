/* eslint-disable @typescript-eslint/no-explicit-any */
import bwapi from '../api/api';
import IPlayer from '../team/player';

export default class LeagueModel {
  private players: IPlayer[] = [];
  private rounds: any;

  constructor() {}

  async fetch() {
    console.info('Fetching La Liga info...');
    const response = await bwapi.getLaLigaInfo();
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
