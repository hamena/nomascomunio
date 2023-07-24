import BiwengerApi from './api/api.js';
import ApiDataDumper from './api/dumper.js';
import league from './api/league.js';

console.log("Hey there! I'm typescript!");

const app = async () => {
  const bwapi = new BiwengerApi(
    league.nomascomunio.leagueId,
    league.nomascomunio.users[0].email,
    league.nomascomunio.users[0].password,
  );
  await bwapi.fetchAuth();
  await bwapi.fetchBasicInfo();

  console.log(bwapi.session);

  const dumper = new ApiDataDumper('2024', bwapi.session.league.id, bwapi.session.user.id as number);

  const authResponse = await bwapi.postAuth();
  const accountResponse = await bwapi.getAccount();
  const laLigaResponse = await bwapi.getLaLigaInfo();
  const teamResponse = await bwapi.getTeamInfo();
  const marketResponse = await bwapi.getMarketInfo();

  dumper.dumpAuthData(authResponse.data);
  dumper.dumpAccountData(accountResponse.data);
  dumper.dumpCompetitionData(laLigaResponse.data);
  dumper.dumpUserData(teamResponse.data);
  dumper.dumpMarketData(marketResponse.data);
};

app();
