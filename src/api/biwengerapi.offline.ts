/* eslint-disable @typescript-eslint/no-unused-vars */
import * as dotenv from 'dotenv';
import { ApiSession, IBiwengerApi } from './api.js';
import { AxiosResponse } from 'axios';
import { readFileSync, readdirSync } from 'fs';
dotenv.config();

export default class BiwengerApiOffline implements IBiwengerApi {
  readonly session: ApiSession;

  readonly authJson;
  readonly accountJson;
  readonly userJson;
  readonly competitionJson;
  readonly marketJson;

  constructor(leagueId: number, email: string) {
    this.session = new ApiSession(
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0',
      'es',
      624,
      email,
      '',
      leagueId,
    );

    const path = './data/collected/' + email;

    const firstDateDir = readdirSync(path)[0];
    const basePath = path + '/' + firstDateDir + '/' + this.session.league.id + '/';
    this.authJson = JSON.parse(readFileSync(basePath + 'auth.json', 'utf-8'));
    this.accountJson = JSON.parse(readFileSync(basePath + 'account.json', 'utf-8'));
    this.userJson = JSON.parse(readFileSync(basePath + 'user.json', 'utf-8'));
    this.competitionJson = JSON.parse(readFileSync(basePath + 'competition.json', 'utf-8'));
    this.marketJson = JSON.parse(readFileSync(basePath + 'market.json', 'utf-8'));
  }

  // ---- FETCHERS ----
  async fetchAuth() {
    const authJson = await this.postAuth();
    this.session.user.jwt = authJson.token;
  }

  async fetchBasicInfo() {
    const accountJson = await this.getAccount();
    const userLeagues = accountJson.data.leagues;
    if (userLeagues.length < 1) {
      throw new Error('User doesnt belong to any league');
    }
    const league = userLeagues.filter((league: { id: number }) => league.id === this.session.league.id);
    if (league.length !== 1) {
      throw new Error(`Could not find league ${this.session.league.id} in api user's leagues`);
    }
    this.session.league.name = league[0].name;
    this.session.league.competition = league[0].competition;
    this.session.league.scoreId = league[0].scoreID;
    this.session.league.type = league[0].type;
    this.session.league.mode = league[0].mode;
    this.session.league.marketMode = league[0].marketMode;
    this.session.user.id = league[0].user.id;
    this.session.user.name = league[0].user.name;
    this.session.user.role = league[0].user.role;
    this.session.user.type = league[0].user.type;
    this.session.user.points = league[0].user.points;
    this.session.user.position = league[0].user.position;
    this.session.user.balance = league[0].user.balance;
  }

  // ---- API METHODS ----
  async postAuth() {
    return this.authJson;
  }

  async getAccount() {
    return this.accountJson;
  }

  async getLaLigaInfo() {
    return this.competitionJson;
  }

  // *,lineup(type,playersID,reservesID,captain,striker,coach,date),players(id,owner),market,offers,-trophies
  async getTeamInfo(fields: string = '*,lineup(type,playersID,reservesID,coach,date),players(id)') {
    return this.userJson;
  }

  async putLineUp(type: string = '', lineup: number[] = []) {
    throw new Error('Method not implemented');
  }

  async getMarketInfo() {
    return this.marketJson;
  }

  async postOffer(playerid: number, amount: number, to = null) {
    throw new Error('Method not implemented');
  }

  async putOffer(offerid: number, status: string) {
    throw new Error('Method not implemented');
  }

  async postSale(playerid: number, amount: number) {
    throw new Error('Method not implemented');
  }
}
