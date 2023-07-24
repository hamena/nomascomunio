import BiwengerApi from './api/api.js';
import league from './api/league.js';

console.log("Hey there! I'm typescript!");

const app = async () => {
  const bwapi = new BiwengerApi(
    league.nomascomunio.leagueId,
    league.nomascomunio.users[0].email,
    league.nomascomunio.users[0].password,
  );
  await bwapi.auth();
  await bwapi.fetchBasicInfo();

  console.log(bwapi.session);

  // const laLigaInfo = await bwapi.getLaLigaInfo();
  // const teamInfo = await bwapi.getTeamInfo();
  const marketInfo = await bwapi.getMarketInfo();

  // console.log(laLigaInfo.data);
  // console.log(teamInfo.data);
  console.log(marketInfo.data);
};

app();
