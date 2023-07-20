import * as dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { scoreIds } from './basics_api';

const baseUrl = 'https://biwenger.as.com';
const endpoints = {
  apiV2User: baseUrl + '/api/v2/user',
  apiV2CompetitionsLaLigaData: baseUrl + '/api/v2/competitions/la-liga/data',
  apiV2Market: baseUrl + '/api/v2/market',
  apiV2Offers: baseUrl + '/api/v2/offers',
};

class BiwengerApi {
  private headers;

  constructor(jwt?: string, userid?: string, leagueid?: string) {
    if (!jwt) throw new Error('JWT cannot be undefined');
    if (!userid) throw new Error('User ID cannot be undefined');
    if (!leagueid) throw new Error('League ID cannot be undefined');
    this.headers = {
      Authorization: 'Bearer ' + jwt,
      'X-User': userid,
      'X-League': leagueid,
    };
  }

  async getLaLigaInfo() {
    const params = {
      score: scoreIds.averageAsSofascore,
    };
    return await axios.get(endpoints.apiV2CompetitionsLaLigaData, { headers: this.headers, params: params });
  }

  async getTeamInfo(fields: string = '*,lineup(type,playersID,reservesID,coach,date),players(id)') {
    const params = {
      fields: fields,
    };
    return await axios.get(endpoints.apiV2User, { headers: this.headers, params: params });
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
    return await axios.put(endpoints.apiV2User, body, { headers: this.headers });
  }

  async getMarketInfo() {
    return await axios.get(endpoints.apiV2Market, { headers: this.headers });
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
    return await axios.post(endpoints.apiV2Offers, body, { headers: this.headers });
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
    return await axios.put(endpoints.apiV2Offers, body, { headers: this.headers });
  }

  async postSale(playerid: number, amount: number) {
    if (!playerid || playerid <= 0) throw new Error('Playerid must be defined and positive');
    if (!amount || amount <= 0) throw new Error('Amount must be defined and positive');
    const body = {
      player: playerid,
      price: amount,
      type: 'sell',
    };
    return await axios.post(endpoints.apiV2Market, body, { headers: this.headers });
  }
}

const authToken = process.env.AUTH_TOKEN;
const userId = process.env.USER_ID;
const leagueId = process.env.LEAGUE_ID;

console.info('jwt:', authToken);
console.info('userId:', userId);
console.info('leagueId:', leagueId);

const bwapi = new BiwengerApi(authToken, userId, leagueId);
export default bwapi;
