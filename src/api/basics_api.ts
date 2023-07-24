export const playerPositions = {
  keeper: 1,
  defender: 2,
  midfielder: 3,
  forward: 4,
};

export const lineupTypes = ['3-4-3', '3-5-2', '4-3-3', '4-4-2', '4-5-1', '5-3-2', '5-4-1'];

export const cannotBeUndefined = (object: unknown, name = 'Object') => {
  if (object === undefined || object === null) throw new Error(name + ' cannot be undefined');
};

export const validateLineUpType = (type: string) => {
  cannotBeUndefined(type, 'Lineup type');
  if (!lineupTypes.includes(type)) {
    throw new Error(`Lineup type is not valid . Accepted values are: ${lineupTypes}`);
  }
};

export const validateLineUp = (lineup: ILineUp[]) => {
  cannotBeUndefined(lineup, 'Lineup');
  if (lineup.length != 11) throw new Error('Lineup length must be exactly 11');
};

export interface ILineUp {
  type: string;
  perfEval: number;
  lineup: (number | null)[];
}
