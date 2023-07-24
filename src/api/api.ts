import * as dotenv from 'dotenv';
dotenv.config();

export interface IApiUser {
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

export interface IApiLeague {
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
  readonly user: IApiUser;
  readonly league: IApiLeague;

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
  fetchAuth(): void;
  fetchBasicInfo(): void;
  postAuth(): unknown;
  getAccount(): unknown;
  getLaLigaInfo(): unknown;
  getTeamInfo(): unknown;
  putLineUp(): unknown;
  getMarketInfo(): unknown;
  postOffer(playerid: number, amount: number, to: null): unknown;
  putOffer(offerid: number, status: string): unknown;
  postSale(playerid: number, amount: number): unknown;
}
