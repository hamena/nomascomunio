/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IPlayer {
  readonly id: number;
  readonly name: string;
  readonly slug: string;
  readonly teamID: number;
  readonly position: number;
  readonly status: string;

  readonly price: number;
  readonly priceIncrement: number;

  readonly fitness: (number | null)[];

  readonly points: number;
  readonly pointsHome: number;
  readonly pointsAway: number;
  readonly pointsLastSeason: number;

  readonly playedHome: number;
  readonly playedAway: number;
}

export interface IApiTeam {
  readonly id: number;
  readonly name: string;
  readonly slug: string;
}

export interface IApiRound {
  readonly id: number;
  readonly name: string;
  readonly short: string;
  readonly status: string;
}

export interface IApiSeason {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly rounds: IApiRound[];
}

export default interface IApiCompetition {
  readonly id: number;
  readonly name: string;
  readonly slug: string;
  readonly season: IApiSeason;

  readonly teams: { [key: string]: IApiTeam };
  readonly players: { [key: string]: IPlayer };
}
