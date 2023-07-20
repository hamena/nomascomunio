export default interface IPlayer {
  id: number;
  position: number;
  slug: string;
  perfEval: number;
  price: number;
  priceIncrement: number;
  points: number;
  pointsHome: number;
  pointsAway: number;
  pointsLastSeason: number;
  pointsScore: number;
  fitness: number[];
  fitnessGradient: number;
  fitnessPrediction: number;
  fitnessScore: number;

  status: string;
  pointsHomeAvg: number;
  pointsAwayAvg: number;
  pointsAvg: number;
  playedHome: number;
  playedAway: number;
  playedTotal: number;
  playedAvg: number;
}
