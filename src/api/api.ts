import IApiCompetition from './competition.api.interface.js';
import IApiMarket from './market.api.interface.js';
import IApiUser from './user.api.interface.js';

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

interface ILineupInfo {
  [key: string]: {
    nDefenders: number;
    nMidfielders: number;
    nStrikers: number;
    isPremium: boolean;
    iDefenders: number[];
    iMidfielders: number[];
    iStrikers: number[];
  };
}

export const LineUpInfo: ILineupInfo = {
  '3-4-3': {
    nDefenders: 3,
    nMidfielders: 4,
    nStrikers: 3,
    isPremium: false,

    iDefenders: [1, 2, 3],
    iMidfielders: [4, 5, 6, 7],
    iStrikers: [8, 9, 10],
  },
  '3-5-2': {
    nDefenders: 3,
    nMidfielders: 5,
    nStrikers: 2,
    isPremium: false,

    iDefenders: [1, 2, 3],
    iMidfielders: [4, 5, 6, 7, 8],
    iStrikers: [9, 10],
  },
  '4-3-3': {
    nDefenders: 4,
    nMidfielders: 3,
    nStrikers: 3,
    isPremium: false,

    iDefenders: [1, 2, 3, 4],
    iMidfielders: [5, 6, 7],
    iStrikers: [8, 9, 10],
  },
  '4-4-2': {
    nDefenders: 4,
    nMidfielders: 4,
    nStrikers: 2,
    isPremium: false,

    iDefenders: [1, 2, 3, 4],
    iMidfielders: [5, 6, 7, 8],
    iStrikers: [9, 10],
  },
  '4-5-1': {
    nDefenders: 4,
    nMidfielders: 5,
    nStrikers: 1,
    isPremium: false,

    iDefenders: [1, 2, 3, 4],
    iMidfielders: [5, 6, 7, 8, 9],
    iStrikers: [10],
  },
  '5-3-2': {
    nDefenders: 5,
    nMidfielders: 3,
    nStrikers: 2,
    isPremium: false,

    iDefenders: [1, 2, 3, 4, 5],
    iMidfielders: [6, 7, 8],
    iStrikers: [9, 10],
  },
  '5-4-1': {
    nDefenders: 5,
    nMidfielders: 4,
    nStrikers: 1,
    isPremium: false,

    iDefenders: [1, 2, 3, 4, 5],
    iMidfielders: [6, 7, 8, 9],
    iStrikers: [10],
  },
};
