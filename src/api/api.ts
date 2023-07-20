import * as dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { scoreIds } from './basics_api.js';

const baseUrl = 'https://biwenger.as.com';
const endpoints = {
  apiV2AuthLogin: baseUrl + '/api/v2/auth/login',
  apiV2User: baseUrl + '/api/v2/user',
  apiV2CompetitionsLaLigaData: baseUrl + '/api/v2/competitions/la-liga/data',
  apiV2Market: baseUrl + '/api/v2/market',
  apiV2Offers: baseUrl + '/api/v2/offers',
};

export interface IApiUser {
  email: string;
  password: string;
  jwt: string;
  id: number;
  leagueId: number;
}

export default class BiwengerApi {
  private readonly user: IApiUser;

  constructor(apiUser: IApiUser) {
    this.user = apiUser;
  }

  private headers() {
    return {
      Authorization: 'Bearer ' + this.user.jwt,
      'X-User': this.user.id,
      'X-League': this.user.leagueId,
      'X-Lang': 'es',
      'X-Version': 624,
    };
  }

  async auth() {
    const body = { email: this.user.email, password: this.user.password };
    const headers = {
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0',
      'X-Lang': 'es',
      'X-Version': 624,
    };
    const response = await axios.post(endpoints.apiV2AuthLogin, body, { headers: headers });
    this.user.jwt = response.data.token;
  }

  async getLaLigaInfo() {
    const params = {
      score: scoreIds.averageAsSofascore,
    };
    return await axios.get(endpoints.apiV2CompetitionsLaLigaData, { headers: this.headers(), params: params });
  }

  async getTeamInfo(fields: string = '*,lineup(type,playersID,reservesID,coach,date),players(id)') {
    const params = {
      fields: fields,
    };
    return await axios.get(endpoints.apiV2User, { headers: this.headers(), params: params });
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
    return await axios.get(endpoints.apiV2Market, { headers: this.headers() });
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
