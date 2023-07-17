
export const lineupsInfo = {
  '3-4-3': {
    nKeepers: 1,
    nDefenders: 3,
    nMidFielders: 4,
    nForwards: 3
  },
  '4-3-3': {
    nKeepers: 1,
    nDefenders: 4,
    nMidFielders: 3,
    nForwards: 3
  },
  '3-5-2': {
    nKeepers: 1,
    nDefenders: 3,
    nMidFielders: 5,
    nForwards: 2

  }, 
  '4-4-2': {
    nKeepers: 1,
    nDefenders: 4,
    nMidFielders: 4,
    nForwards: 2
  },
  '4-5-1': {
    nKeepers: 1,
    nDefenders: 4,
    nMidFielders: 5,
    nForwards: 1
  }, 
  '5-3-2': {
    nKeepers: 1,
    nDefenders: 5,
    nMidFielders: 3,
    nForwards: 2
  }, 
  '5-4-1': {
    nKeepers: 1,
    nDefenders: 5,
    nMidFielders: 4,
    nForwards: 1
  } 
}

export const nRoundsInSeason = 38

export const maxPlayerPointsPerMatch = 6 // estimated
export const maxPlayerPointsInFitness = 5 * maxPlayerPointsPerMatch
export const maxPlayerPointsInSeason = nRoundsInSeason * maxPlayerPointsPerMatch
