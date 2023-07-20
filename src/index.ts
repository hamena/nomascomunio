import BiwengerApi from './api/api.js';

console.log("Hey there! I'm typescript!");

const app = async () => {
  const bwapi = new BiwengerApi({
    email: 'josecrespoguerrero@gmail.com',
    password: 'petabereta',
    jwt: '',
    id: -1,
    leagueId: -1,
  });
  await bwapi.auth();
};

app();
