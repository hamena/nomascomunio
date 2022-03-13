
module.exports.fitnessValue = (player={fitness:[]}) => {
  player.fitness = player.fitness || []
  var sum = 0
  player.fitness.forEach(value => sum += Number.isInteger(value) ? value : 0)
  return sum
}

module.exports.nMatchesPlayed = (player = {playedHome:0, playedAway:0}) => {
  player.playedHome = player.playedHome || 0
  player.playedAway = player.playedAway || 0
  return player.playedHome + player.playedAway
}

module.exports.pointsPerMatch = (player = {nMatchesPlayed:0, points:0}) => {
  player.nMatchesPlayed = player.nMatchesPlayed || 0
  player.points = player.points || 0
  if (player.nMatchesPlayed > 0) {
    return player.points / player.nMatchesPlayed
  } else {
    return 0
  }
}
