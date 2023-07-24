import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { getFormattedDateTime } from '../util/strings.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class ApiDataDumper {
  static readonly authFile = 'auth.json';
  static readonly accountFile = 'account.json';
  static readonly userFile = 'user.json';
  static readonly competitionDataFile = 'competition.json';
  static readonly marketFile = 'market.json';
  static readonly offersFile = 'offers.json';

  static readonly basePath = './data/collected/{season}/{date}/{leagueId}/{userId}/';
  static readonly seasonPlaceholder = '{season}';
  static readonly datePlaceholder = '{date}';
  static readonly leagueIdPlaceholder = '{leagueId}';
  static readonly userIdPlaceholder = '{userId}';

  readonly season: string;
  readonly date: string;
  readonly leagueId: number;
  readonly userId: number;

  constructor(season: string, leagueId: number, userId: number) {
    this.season = season;
    this.date = getFormattedDateTime();
    this.leagueId = leagueId;
    this.userId = userId;
  }

  private static buildBasePath(season: string, date: string, leagueId: number, userId?: number): string {
    return ApiDataDumper.basePath
      .replace(ApiDataDumper.seasonPlaceholder, season)
      .replace(ApiDataDumper.datePlaceholder, date)
      .replace(ApiDataDumper.leagueIdPlaceholder, leagueId.toString())
      .replace(ApiDataDumper.userIdPlaceholder, userId ? userId.toString() : '.');
  }

  private static ensurePathExists(path: string) {
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
  }

  private static writeDataIntoFile(filePath: string, rawJson: any) {
    writeFileSync(filePath, rawJson);
  }

  dumpAuthData(authData: any) {
    const basePath = ApiDataDumper.buildBasePath(this.season, this.date, this.leagueId, undefined);
    ApiDataDumper.ensurePathExists(basePath);
    ApiDataDumper.writeDataIntoFile(basePath + ApiDataDumper.authFile, JSON.stringify(authData));
  }

  dumpAccountData(accountData: any) {
    const basePath = ApiDataDumper.buildBasePath(this.season, this.date, this.leagueId, undefined);
    ApiDataDumper.ensurePathExists(basePath);
    ApiDataDumper.writeDataIntoFile(basePath + ApiDataDumper.accountFile, JSON.stringify(accountData));
  }

  dumpUserData(userData: any) {
    const basePath = ApiDataDumper.buildBasePath(this.season, this.date, this.leagueId, this.userId);
    ApiDataDumper.ensurePathExists(basePath);
    ApiDataDumper.writeDataIntoFile(basePath + ApiDataDumper.userFile, JSON.stringify(userData));
  }

  dumpCompetitionData(competitionData: any) {
    const basePath = ApiDataDumper.buildBasePath(this.season, this.date, this.leagueId, this.userId);
    ApiDataDumper.ensurePathExists(basePath);
    ApiDataDumper.writeDataIntoFile(basePath + ApiDataDumper.competitionDataFile, JSON.stringify(competitionData));
  }

  dumpMarketData(marketData: any) {
    const basePath = ApiDataDumper.buildBasePath(this.season, this.date, this.leagueId, this.userId);
    ApiDataDumper.ensurePathExists(basePath);
    ApiDataDumper.writeDataIntoFile(basePath + ApiDataDumper.marketFile, JSON.stringify(marketData));
  }

  dumpOffersData(offersData: any) {
    const basePath = ApiDataDumper.buildBasePath(this.season, this.date, this.leagueId, this.userId);
    ApiDataDumper.ensurePathExists(basePath);
    ApiDataDumper.writeDataIntoFile(basePath + ApiDataDumper.offersFile, JSON.stringify(offersData));
  }
}
