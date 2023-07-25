import { IBiwengerApi } from '../api/api.js';
import IApiCompetition from '../api/competition.api.interface.js';
import IApiMarket from '../api/market.api.interface.js';
import IApiUser from '../api/user.api.interface.js';

export default class BiwengerReadonlyData {
  static competition: IApiCompetition;
  static user: IApiUser;
  static market: IApiMarket;

  static async fetch(bwapi: IBiwengerApi) {
    this.competition = await bwapi.getLaLigaInfo();
    this.user = await bwapi.getTeamInfo();
    this.market = await bwapi.getMarketInfo();
  }
}
