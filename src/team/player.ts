import { IPlayer } from '../api/competition.api.interface.js';

export default interface IPlayerExtended extends IPlayer {
  perfEval: number;

  fitnessGradient: number;
  fitnessPrediction: number;
  fitnessScore: number;

  pointsHomeAvg: number;
  pointsAwayAvg: number;
  pointsAvg: number;
  pointsScore: number;

  playedAvg: number;
  playedTotal: number;
}
