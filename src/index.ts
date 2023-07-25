import BiwengerApi from './api/biwengerapi.js';
import startupApiData from './api/startup.api.data.js';
import BiwengerReadonlyData from './model/biwenger.readonly.data.js';

console.log("Hey there! I'm typescript!");

const app = async () => {
  const offlineBwapi = new BiwengerApi(
    startupApiData.nomascomunio.leagueId,
    startupApiData.nomascomunio.users[0].email,
    startupApiData.nomascomunio.users[0].password,
  );

  await offlineBwapi.fetchAuth();
  await offlineBwapi.fetchBasicInfo();

  console.log(offlineBwapi.session);

  await BiwengerReadonlyData.fetch(offlineBwapi);
};

app();
