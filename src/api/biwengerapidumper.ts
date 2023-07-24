import { existsSync, mkdirSync, writeFileSync } from 'fs';
import BiwengerApi from './biwengerapi.js';
import { getFormattedDateTime } from '../util/strings.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class BiwengerApiDumper extends BiwengerApi {
  static readonly authFile = 'auth.json';
  static readonly accountFile = 'account.json';
  static readonly userFile = 'user.json';
  static readonly competitionDataFile = 'competition.json';
  static readonly marketFile = 'market.json';
  static readonly offersFile = 'offers.json';

  static readonly basePath = './data/collected/{email}/{date}/{leagueId}/';
  static readonly emailPlaceholder = '{email}';
  static readonly datePlaceholder = '{date}';
  static readonly leagueIdPlaceholder = '{leagueId}';

  readonly strDate: string;

  constructor(leagueId: number, email: string, password: string) {
    super(leagueId, email, password);
    this.strDate = getFormattedDateTime();
  }

  private buildBasePath(): string {
    return BiwengerApiDumper.basePath
      .replace(BiwengerApiDumper.emailPlaceholder, this.session.user.email)
      .replace(BiwengerApiDumper.datePlaceholder, this.strDate)
      .replace(BiwengerApiDumper.leagueIdPlaceholder, this.session.league.id.toString());
  }

  private static ensurePathExists(path: string) {
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
  }

  private static writeDataIntoFile(filePath: string, strJson: string) {
    writeFileSync(filePath, strJson);
  }

  dumpAuthData(authData: unknown) {
    const basePath = this.buildBasePath();
    BiwengerApiDumper.ensurePathExists(basePath);
    BiwengerApiDumper.writeDataIntoFile(basePath + BiwengerApiDumper.authFile, JSON.stringify(authData));
  }

  dumpAccountData(accountData: unknown) {
    const basePath = this.buildBasePath();
    BiwengerApiDumper.ensurePathExists(basePath);
    BiwengerApiDumper.writeDataIntoFile(basePath + BiwengerApiDumper.accountFile, JSON.stringify(accountData));
  }

  dumpUserData(userData: unknown) {
    const basePath = this.buildBasePath();
    BiwengerApiDumper.ensurePathExists(basePath);
    BiwengerApiDumper.writeDataIntoFile(basePath + BiwengerApiDumper.userFile, JSON.stringify(userData));
  }

  dumpCompetitionData(competitionData: unknown) {
    const basePath = this.buildBasePath();
    BiwengerApiDumper.ensurePathExists(basePath);
    BiwengerApiDumper.writeDataIntoFile(
      basePath + BiwengerApiDumper.competitionDataFile,
      JSON.stringify(competitionData),
    );
  }

  dumpMarketData(marketData: unknown) {
    const basePath = this.buildBasePath();
    BiwengerApiDumper.ensurePathExists(basePath);
    BiwengerApiDumper.writeDataIntoFile(basePath + BiwengerApiDumper.marketFile, JSON.stringify(marketData));
  }

  dumpOffersData(offersData: any) {
    const basePath = this.buildBasePath();
    BiwengerApiDumper.ensurePathExists(basePath);
    BiwengerApiDumper.writeDataIntoFile(basePath + BiwengerApiDumper.offersFile, JSON.stringify(offersData));
  }
}
