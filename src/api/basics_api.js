export const scoreIds = {
  sofascore: 1,
  as: 2,
  statistics: 3,
  jornadaPerfecta: 4,
  averageAsSofascore: 5,
  biwengerSocial: 6,
};

export const playerPositions = {
  keeper: 1,
  defender: 2,
  midfielder: 3,
  forward: 4,
};

export const lineupTypes = ['3-4-3', '3-5-2', '4-3-3', '4-4-2', '4-5-1', '5-3-2', '5-4-1'];

export const cannotBeUndefined = (object, name = 'Object') => {
  if (object === undefined || object === null) throw new Error(name + ' cannot be undefined');
};

export const validateLineUpType = (type) => {
  this.cannotBeUndefined(type, 'Lineup type');
  if (!this.lineupTypes.includes(type))
    throw new Error('Lineup type is not valid. Accepted values are:', this.lineupTypes);
};

export const validateLineUp = (lineup) => {
  this.cannotBeUndefined(lineup, 'Lineup');
  if (lineup.length != 11) throw new Error('Lineup length must be exactly 11');
};
