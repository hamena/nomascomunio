import { ILineUp, lineupTypes, playerPositions } from '../api/basics_api.js';
import LeagueModel from '../model/league_model.js';
import TeamModel from '../model/team_model.js';
import Analyst from './analyst.js';
import { lineupsInfo } from './knowledge.js';
import IPlayer from './player.js';

class Coach {
  private leagueModel: LeagueModel;
  private teamModel: TeamModel;

  private analyst: Analyst;

  private currentPlayers;

  constructor(leagueModel: LeagueModel, teamModel: TeamModel, analyst: Analyst) {
    this.leagueModel = leagueModel;
    this.teamModel = teamModel;
    this.analyst = analyst;
    this.currentPlayers = this.teamModel.getPlayers().map((playerid) => this.leagueModel.getPlayer(playerid));
    this.currentPlayers.map((player) => this.analyst.evalPlayer(player));
  }

  bestLineups() {
    const lineups: { [key: string]: ILineUp } = {};
    lineupTypes.forEach((lineupType) => {
      lineups[lineupType] = this.bestLineup(lineupType);
    });
    return lineups;
  }

  bestLineup(lineupType: string): ILineUp {
    const teamKeepers = this.currentPlayers.filter((player) => player.position === playerPositions.keeper);
    const teamDefenders = this.currentPlayers.filter((player) => player.position === playerPositions.defender);
    const teamMidfielders = this.currentPlayers.filter((player) => player.position === playerPositions.midfielder);
    const teamForwards = this.currentPlayers.filter((player) => player.position === playerPositions.forward);
    teamKeepers.sort((player1, player2) => player2.perfEval - player1.perfEval);
    teamDefenders.sort((player1, player2) => player2.perfEval - player1.perfEval);
    teamMidfielders.sort((player1, player2) => player2.perfEval - player1.perfEval);
    teamForwards.sort((player1, player2) => player2.perfEval - player1.perfEval);
    const keyTyped = lineupType as keyof typeof lineupsInfo;
    const lineupInfo = lineupsInfo[keyTyped];
    const lineup: IPlayer[] = [];
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

function push(lineup: (IPlayer | null)[], max: number, players: IPlayer[]) {
  for (let i = 0; i < max; i++) {
    const player = players[i];
    if (player) {
      lineup.push(player);
    } else {
      lineup.push(null);
    }
  }
}

// function toStr(player) {
//   return player ? player.name + ' ' + player.perfEval : '';
// }

export default Coach;
