import BiwengerApiDumper from './api/biwengerapidumper.js';
import league from './api/league.js';

console.log("Hey there! I'm typescript!");

const dumpApi = async () => {
  const bwapi = new BiwengerApiDumper(
    league.nomascomunio.leagueId,
    league.nomascomunio.users[0].email,
    league.nomascomunio.users[0].password,
  );
  await bwapi.fetchAuth();
  await bwapi.fetchBasicInfo();

  console.log(bwapi.session);

  const authResponse = await bwapi.postAuth();
  const accountResponse = await bwapi.getAccount();
  const laLigaResponse = await bwapi.getLaLigaInfo();
  const teamResponse = await bwapi.getTeamInfo();
  const marketResponse = await bwapi.getMarketInfo();

  bwapi.dumpAuthData(authResponse.data);
  bwapi.dumpAccountData(accountResponse.data);
  bwapi.dumpCompetitionData(laLigaResponse);
  bwapi.dumpUserData(teamResponse);
  bwapi.dumpMarketData(marketResponse);
};

dumpApi();
