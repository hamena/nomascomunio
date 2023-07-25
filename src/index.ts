import { LineUpInfo } from './api/api.js';
import { lineupTypes } from './api/basics_api.js';
import BiwengerApiOffline from './api/biwengerapi.offline.js';
import startupApiData from './api/startup.api.data.js';
import BiwengerReadonlyData from './model/biwenger.readonly.data.js';

console.log("Hey there! I'm typescript!");

const app = async () => {
  const offlineBwapi = new BiwengerApiOffline(
    startupApiData.nomascomunio.leagueId,
    startupApiData.nomascomunio.users[0].email,
    // startupApiData.nomascomunio.users[0].password,
  );

  await offlineBwapi.fetchAuth();
  await offlineBwapi.fetchBasicInfo();

  // console.log(offlineBwapi.session);

  await BiwengerReadonlyData.fetch(offlineBwapi);

  const allLineups = [];

  lineupTypes.forEach((lineupType) => {});

  console.log('KEEPER:', BiwengerReadonlyData.getPlayerInfo(BiwengerReadonlyData.user.lineup.playersID[0]));
  console.log('DEFENDERS:');
  LineUpInfo[BiwengerReadonlyData.user.lineup.type].iDefenders.forEach((i) =>
    console.log(BiwengerReadonlyData.getPlayerInfo(BiwengerReadonlyData.user.lineup.playersID[i])),
  );
  console.log('MIDFIELDERS:');
  LineUpInfo[BiwengerReadonlyData.user.lineup.type].iMidfielders.forEach((i) =>
    console.log(BiwengerReadonlyData.getPlayerInfo(BiwengerReadonlyData.user.lineup.playersID[i])),
  );
  console.log('STRIKERS:');
  LineUpInfo[BiwengerReadonlyData.user.lineup.type].iStrikers.forEach((i) =>
    console.log(BiwengerReadonlyData.getPlayerInfo(BiwengerReadonlyData.user.lineup.playersID[i])),
  );
};

app();
