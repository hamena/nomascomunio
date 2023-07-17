import { lineupTypes, playerPositions } from '../api/basics_api.js';
import { lineupsInfo } from './knowledge.js';

class Coach {
  #leagueModel;
  #teamModel;

  #analyst;

  #currentPlayers;

  constructor(leagueModel, teamModel, analyst) {
    this.#leagueModel = leagueModel;
    this.#teamModel = teamModel;
    this.#analyst = analyst;
    this.#currentPlayers = this.#teamModel.getPlayers().map((playerid) => this.#leagueModel.getPlayer(playerid));
    this.#currentPlayers.map((player) => this.#analyst.evalPlayer(player));
  }

  bestLineups() {
    var lineups = {};
    lineupTypes.forEach((lineupType) => {
      lineups[lineupType] = this.bestLineup(lineupType);
    });
    return lineups;
  }

  bestLineup(lineupType) {
    var teamKeepers = this.#currentPlayers.filter((player) => player.position === playerPositions.keeper);
    var teamDefenders = this.#currentPlayers.filter((player) => player.position === playerPositions.defender);
    var teamMidfielders = this.#currentPlayers.filter((player) => player.position === playerPositions.midfielder);
    var teamForwards = this.#currentPlayers.filter((player) => player.position === playerPositions.forward);
    teamKeepers.sort((player1, player2) => player2.perfEval - player1.perfEval);
    teamDefenders.sort((player1, player2) => player2.perfEval - player1.perfEval);
    teamMidfielders.sort((player1, player2) => player2.perfEval - player1.perfEval);
    teamForwards.sort((player1, player2) => player2.perfEval - player1.perfEval);
    const lineupInfo = lineupsInfo[lineupType];
    var lineup = [];
    push(lineup, lineupInfo.nKeepers, teamKeepers);
    push(lineup, lineupInfo.nDefenders, teamDefenders);
    push(lineup, lineupInfo.nMidFielders, teamMidfielders);
    push(lineup, lineupInfo.nForwards, teamForwards);
    const perfEval = lineup.reduce((perfEval, player) => (player ? perfEval + player.perfEval : 0), 0);
    return {
      type: lineupType,
      perfEval: perfEval / lineup.length,
      lineup: lineup.map((player) => (player ? player.id : null)),
    };
  }
}

function push(lineup, max, players) {
  for (var i = 0; i < max; i++) {
    const player = players[i];
    if (player) {
      lineup.push(player);
    } else {
      lineup.push(null);
    }
  }
}

function toStr(player) {
  return player ? player.name + ' ' + player.perfEval : '';
}

export default Coach;
