import BiwengerApiOffline from './api/biwengerapi.offline.js';
import startupApiData from './api/startup.api.data.js';

console.log("Hey there! I'm typescript!");

const app = async () => {
  const offlineBwapi = new BiwengerApiOffline(
    startupApiData.nomascomunio.leagueId,
    startupApiData.nomascomunio.users[0].email,
  );

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
