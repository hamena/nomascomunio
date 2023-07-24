import BiwengerApiDumper from './api/biwengerapidumper.js';
import startupApiData from './api/startup.api.data.js';

console.log("Hey there! I'm typescript!");

const dumpApi = async () => {
  const bwapi = new BiwengerApiDumper(
    startupApiData.nomascomunio.leagueId,
    startupApiData.nomascomunio.users[0].email,
    startupApiData.nomascomunio.users[0].password,
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
  bwapi.dumpCompetitionData({ status: 200, data: laLigaResponse });
  bwapi.dumpUserData({ status: 200, data: teamResponse });
  bwapi.dumpMarketData({ status: 200, data: marketResponse });
};

dumpApi();
