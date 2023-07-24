// NOMASCOMUNIO LEAGUE
const nomascomunioPassword = process.env.NOMASCOMUNIO_PASSWORD;

// GREEN GUYS LEAGUE
const greenGuysEmail = process.env.GREENGUYS_EMAIL;
const greenGuysPassword = process.env.GREENGUYS_PASSWORD;

// LIGA NUTO LEAGUE
const ligaNutoEmail = process.env.LIGANUTO_EMAIL;
const ligaNutoPassword = process.env.LIGANUTO_PASSWORD;

export interface IApiLeague {
  leagueId: number;
  users: Array<{ email: string; password: string }>;
}

export default {
  nomascomunio: {
    leagueId: 0,
    users: [
      { email: 'nomascomunio.dev.0@proton.me', password: nomascomunioPassword },
      { email: 'nomascomunio.dev.1@proton.me', password: nomascomunioPassword },
      { email: 'nomascomunio.dev.2@proton.me', password: nomascomunioPassword },
      { email: 'nomascomunio.dev.3@proton.me', password: nomascomunioPassword },
      { email: 'nomascomunio.dev.4@proton.me', password: nomascomunioPassword },
    ],
  } as IApiLeague,
  greenGuys: {
    leagueId: 0,
    users: [{ email: greenGuysEmail, password: greenGuysPassword }],
  } as IApiLeague,
  ligaNuto: {
    leagueId: 0,
    users: [{ email: ligaNutoEmail, password: ligaNutoPassword }],
  } as IApiLeague,
};
