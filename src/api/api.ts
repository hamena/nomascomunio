import * as dotenv from 'dotenv';
import IApiCompetition from './competition.api.interface.js';
import IApiUser from './user.api.interface.js';
import IApiMarket from './market.api.interface.js';
dotenv.config();

export interface IApiSessionUser {
  email: string;
  password: string;
  jwt?: string;
  id?: number;
  name?: string;
  role?: string;
  type?: string;
  points?: number;
  position?: number;
  balance?: number;
}

export interface IApiSessionLeague {
  id: number;
  name?: string;
  competition?: string;
  scoreId?: number;
  type?: string;
  mode?: string;
  marketMode?: string;
}

export class ApiSession {
  readonly userAgent: string;
  readonly version: number;
  readonly lang: string;
  readonly user: IApiSessionUser;
  readonly league: IApiSessionLeague;

  constructor(userAgent: string, lang: string, version: number, email: string, password: string, leagueId: number) {
    this.userAgent = userAgent;
    this.version = version;
    this.lang = lang;
    this.user = {
      email: email,
      password: password,
    };
    this.league = { id: leagueId };
  }
}

export interface IBiwengerApi {
  readonly session: ApiSession;

  fetchAuth(): void;
  fetchBasicInfo(): void;
  postAuth(): unknown;
  getAccount(): unknown;
  getLaLigaInfo(): Promise<IApiCompetition>;
  getTeamInfo(): Promise<IApiUser>;
  putLineUp(): unknown;
  getMarketInfo(): Promise<IApiMarket>;
  postOffer(playerid: number, amount: number, to: null): unknown;
  putOffer(offerid: number, status: string): unknown;
  postSale(playerid: number, amount: number): unknown;
}
