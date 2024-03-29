import * as dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { ApiSession, IBiwengerApi } from './api.js';
import IApiCompetition from './competition.api.interface.js';
import IApiUser from './user.api.interface.js';
import IApiMarket from './market.api.interface.js';

const baseUrl = 'https://biwenger.as.com';
const endpoints = {
  apiV2AuthLogin: baseUrl + '/api/v2/auth/login',
  apiV2Account: baseUrl + '/api/v2/account',
  apiV2User: baseUrl + '/api/v2/user',
  apiV2CompetitionsLaLigaData: baseUrl + '/api/v2/competitions/la-liga/data',
  apiV2Market: baseUrl + '/api/v2/market',
  apiV2Offers: baseUrl + '/api/v2/offers',
};

export default class BiwengerApi implements IBiwengerApi {
  readonly session: ApiSession;

  constructor(leagueId: number, email: string, password: string) {
    this.session = new ApiSession(
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0',
      'es',
      624,
      email,
      password,
      leagueId,
    );
  }

  // ---- COMMON HEADERS ----
  private headers() {
    if (!this.session.user.jwt) {
      throw new Error('User jwt is undefined. Must auth user first');
    }
    if (!this.session.user.id) {
      throw new Error('User id is undefined. Must fetch basic info first');
    }
    return {
      Authorization: 'Bearer ' + this.session.user.jwt,
      'User-Agent': this.session.userAgent,
      'X-User': this.session.user.id,
      'X-League': this.session.league.id,
      'X-Lang': this.session.lang,
      'X-Version': this.session.version,
    };
  }

  // ---- FETCHERS ----
  async fetchAuth() {
    const response = await this.postAuth();
    this.session.user.jwt = response.data.token;
  }

  async fetchBasicInfo() {
    const response = await this.getAccount();
    const userLeagues = response.data.data.leagues;
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
    const body = { email: this.session.user.email, password: this.session.user.password };
    const headers = {
      'User-Agent': this.session.userAgent,
      'X-Lang': this.session.lang,
      'X-Version': this.session.version,
    };
    return await axios.post(endpoints.apiV2AuthLogin, body, { headers: headers });
  }

  async getAccount() {
    if (!this.session.user.jwt) {
      throw new Error('User jwt is undefined. Must auth user first');
    }
    const headers = {
      Authorization: 'Bearer ' + this.session.user.jwt,
      'User-Agent': this.session.userAgent,
      'X-Lang': this.session.lang,
      'X-Version': this.session.version,
    };
    return await axios.get(endpoints.apiV2Account, { headers: headers });
  }

  async getLaLigaInfo() {
    if (!this.session.league.scoreId) {
      throw new Error('League score ID is not defined. Must fetch basic info first');
    }
    const params = {
      score: this.session.league.scoreId,
    };
    const response = await axios.get(endpoints.apiV2CompetitionsLaLigaData, {
      headers: this.headers(),
      params: params,
    });
    return response.data.data as IApiCompetition;
  }

  // Alternative: *,lineup(type,playersID,reservesID,coach,date),players(id)
  async getTeamInfo(
    fields: string = '*,lineup(type,playersID,reservesID,captain,striker,coach,date),players(id,owner),market,offers,-trophies',
  ) {
    const params = {
      fields: fields,
    };
    const response = await axios.get(endpoints.apiV2User, { headers: this.headers(), params: params });
    return response.data.data as IApiUser;
  }

  async putLineUp(type: string = '', lineup: number[] = []) {
    // validateLineUpType(type)
    // validateLineUp(lineup)
    const body = {
      lineup: {
        type: type,
        playersID: lineup,
        reservesID: [],
      },
    };
    return await axios.put(endpoints.apiV2User, body, { headers: this.headers() });
  }

  async getMarketInfo() {
    const response = await axios.get(endpoints.apiV2Market, { headers: this.headers() });
    return response.data.data as IApiMarket;
  }

  async postOffer(playerid: number, amount: number, to = null) {
    if (!playerid || playerid <= 0) throw new Error('Playerid must be defined and positive');
    if (!amount || amount <= 0) throw new Error('Amount must be defined and positive');
    const body = {
      amount: amount,
      requestedPlayers: [playerid],
      to: to,
      type: 'purchase',
    };
    return await axios.post(endpoints.apiV2Offers, body, { headers: this.headers() });
  }

  async putOffer(offerid: number, status: string) {
    if (!offerid || offerid <= 0) throw new Error('Offer ID must be defined and positive');
    if (!status) throw new Error('Status must be defined');
    if (status !== 'accepted' && status !== 'rejected')
      throw Error(
        'Invalid value "' + status + '" for status argument. Accepted values for status: "accepted", "rejected"',
      );
    const body = {
      status: status,
    };
    return await axios.put(endpoints.apiV2Offers, body, { headers: this.headers() });
  }

  async postSale(playerid: number, amount: number) {
    if (!playerid || playerid <= 0) throw new Error('Playerid must be defined and positive');
    if (!amount || amount <= 0) throw new Error('Amount must be defined and positive');
    const body = {
      player: playerid,
      price: amount,
      type: 'sell',
    };
    return await axios.post(endpoints.apiV2Market, body, { headers: this.headers() });
  }
}
