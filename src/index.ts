import BiwengerApiOffline from './api/biwengerapi.offline.js';
import league from './api/league.js';

console.log("Hey there! I'm typescript!");

const app = async () => {
  const offlineBwapi = new BiwengerApiOffline(league.nomascomunio.leagueId, league.nomascomunio.users[0].email);

  await offlineBwapi.fetchAuth();
  await offlineBwapi.fetchBasicInfo();

  console.log(offlineBwapi.session);
};

app();
