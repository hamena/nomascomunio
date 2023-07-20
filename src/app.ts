import Analyst from './team/analyst.js';
import Coach from './team/coach.js';
import { ILineUp, playerPositions } from './api/basics_api.js';
import TeamModel from './model/team_model.js';
import MarketModel from './model/market_model.js';
import LeagueModel from './model/league_model.js';
import IPlayer from './team/player.js';
import BiwengerApi from './api/api.js';

if (!process.env.BW_API_USERNAME) {
  throw new Error('Must set BW_API_USERNAME environment variable');
}
if (!process.env.BW_API_PASSWORD) {
  throw new Error('Must set BW_API_PASSWORD environment variable');
}

const bwApiUsername = process.env.BW_API_USERNAME;
const bwApiPassword = process.env.BW_API_PASSWORD;

const app = async () => {
  try {
    console.info('jwt:', process.env.AUTH_TOKEN);

    const bwapi = new BiwengerApi({ email: bwApiUsername, password: bwApiPassword, jwt: '', id: -1, leagueId: -1 });
    const teamModel = new TeamModel(bwapi);
    const marketModel = new MarketModel(bwapi);
    const leagueModel = new LeagueModel(bwapi);

    await teamModel.fetch();
    // console.info('team players:', teamModel.getPlayers())
    // console.info('lineup:', teamModel.getLineup())

    await leagueModel.fetch();
    // console.info('Rounds:', leagueModel.getRounds())
    // console.info('Players:', leagueModel.getPlayers())

    await marketModel.fetch();
    // console.info('Balance:', marketModel.getBalance(), 'Max bid:', marketModel.getMaxBid())
    // console.info('Market sales', marketModel.getSales())
    // console.info('Market offers', marketModel.getOffers())

    // const detailedTeam = teamModel.getPlayers().map(playerid => leagueModel.getPlayer(playerid))
    // console.info('detailed team:', detailedTeam)

    // TEST ANALYST
    const analyst = new Analyst(leagueModel);
    teamModel.getPlayers().forEach((playerId) => {
      const player = leagueModel.getPlayer(playerId);
      if (player !== undefined) {
        analyst.evalPlayer(player);
        printPlayer(player);
      } else {
        console.error('Undefined player! ID:', playerId);
      }
    });

    // TEST COACH
    const coach = new Coach(leagueModel, teamModel, analyst);
    const lineups = coach.bestLineups();
    const lineupsArray = Object.values(lineups);
    lineupsArray.forEach((lineup) => printLineup(leagueModel, lineup));
    lineupsArray.sort((a, b) => b.perfEval - a.perfEval);
    const bestLineup = lineupsArray[0];
    console.info('Best lineup: ');
    printLineup(leagueModel, bestLineup);
    // wbapi.putLineUp(bestLineup.type, bestLineup.lineup)

    // // TEST MANAGER
    // const manager = new Manager(leagueModel, marketModel)
    // manager.critics(bestLineup)
  } catch (error) {
    console.error('Oopsss this error should not be here!', error);
  }
};

function printLineup(leagueModel: LeagueModel, lineup: ILineUp) {
  const players = lineup.lineup
    .filter((playerId) => playerId !== null)
    .map((playerId) => leagueModel.getPlayer(playerId !== null ? playerId : -1))
    .filter((player) => player !== undefined);
  const keepers = players.filter((player) => player.position === playerPositions.keeper);
  const defenders = players.filter((player) => player.position === playerPositions.defender);
  const midfielders = players.filter((player) => player.position === playerPositions.midfielder);
  const forwards = players.filter((player) => player.position === playerPositions.forward);
  let keepersStr = 'KP: ';
  let defendersStr = 'DF: ';
  let midfieldersStr = 'MF: ';
  let forwardsStr = 'FW: ';
  keepers.forEach((keeper) => (keepersStr += keeper.slug + ', '));
  defenders.forEach((defender) => (defendersStr += defender.slug + ', '));
  midfielders.forEach((midfielder) => (midfieldersStr += midfielder.slug + ', '));
  forwards.forEach((forward) => (forwardsStr += forward.slug + ', '));
  console.info('--------', lineup.type, '-', lineup.perfEval, '--------');
  console.info(keepersStr);
  console.info(defendersStr);
  console.info(midfieldersStr);
  console.info(forwardsStr);
}

function printPlayer(player: IPlayer) {
  console.info('-------------------------------------------');
  console.info(positionName[player.position], '[' + player.id + ']', player.slug, 'PERF:', player.perfEval);
  console.info('Value:', player.price, player.priceIncrement);
  console.info(
    'Points:',
    player.points,
    'H(' + player.pointsHome + ')',
    'A(' + player.pointsAway + ') -',
    'Last season:',
    player.pointsLastSeason,
  );
  console.info('Points score:', player.pointsScore);
  console.info(
    'Fitness:',
    player.fitness,
    '- Gradient:',
    player.fitnessGradient,
    'Prediction:',
    player.fitnessPrediction,
  );
  console.info('Fitness score:', player.fitnessScore);
}

const positionName = ['none', 'KP', 'DF', 'MF', 'FW', 'COACH'];

app();
