export interface IApiLineup {
  readonly type: string;
  readonly date: number;
  readonly playersID: number[];
}

export default interface IApiUser {
  readonly id: number;
  readonly name: string;
  readonly role: string;
  readonly points: number;
  readonly balance: number;

  readonly lineup: IApiLineup;
  readonly market: unknown; // TODO: create market interface
  readonly offers: unknown; // TODO: create offers interface
  readonly players: { id: number }[];
}
