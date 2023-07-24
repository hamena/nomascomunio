import BiwengerApiOffline from './api/biwengerapi.offline.js';
import league from './api/league.js';

console.log("Hey there! I'm typescript!");

const app = async () => {
  const offlineBwapi = new BiwengerApiOffline(league.nomascomunio.leagueId, league.nomascomunio.users[0].email);

  await offlineBwapi.fetchAuth();
  await offlineBwapi.fetchBasicInfo();

  console.log(offlineBwapi.session);

  const competition = await offlineBwapi.getLaLigaInfo();
  const user = await offlineBwapi.getTeamInfo();
  const market = await offlineBwapi.getMarketInfo();

  console.log(competition);
  console.log(user);
  console.log(market);
};

app();
