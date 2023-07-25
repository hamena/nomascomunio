import { IApiPlayer } from '../api/competition.api.interface.js';

export default interface IPlayer extends IApiPlayer {
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
