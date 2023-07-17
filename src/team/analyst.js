import regression from 'regression'
import { maxPlayerPointsInFitness, maxPlayerPointsInSeason, maxPlayerPointsPerMatch, nRoundsInSeason } from './knowledge.js'

class Analyst {

  #leagueModel

  #nextRound
  #nextRoundNumber

  constructor(leagueModel) {
    this.#leagueModel = leagueModel
    this.#nextRound = this.#leagueModel.getNextRound()
    this.#nextRoundNumber = this.#nextRound ? Number.parseInt(this.#nextRound.name.substring(6)) : -1
  }

  evalPlayer(player) {
    this.#fitnessRegression(player)
    this.#fitnessScore(player)
    this.#playedMatches(player)
    this.#points(player)
    const fitnessWeight = 0.6
    const pointsWeight = 0.4
    player.perfEval = player.fitnessScore * fitnessWeight + player.pointsScore * pointsWeight
    this.#postEval(player)
  }

  #fitnessRegression(player) {
    const fitness = player.fitness.map(v => typeof v === 'number' ? v : 0 )
    fitness.reverse()
    var data = []
    var counter = 0
    fitness.forEach(y => {
      data.push([counter, y])
      counter += 1
    })
    const result = regression.linear(data)
    player.fitnessGradient = result.equation[0]
    player.fitnessPrediction = result.predict(counter)[1]
  }

  #fitnessScore(player) {
    const fitness = player.fitness.map(v => typeof v === 'number' ? v : 0 )
    player.fitnessScore = fitness.reduce((sum, v) => sum + v, 0) / maxPlayerPointsInFitness
  }

  #playedMatches(player) {
    player.playedAvg = player.playedTotal / this.#nextRoundNumber-1
  }

  #points(player) {
    const nFinishedRounds = this.#nextRoundNumber-1
    const currentSeasonPointsScore = nFinishedRounds > 0 ? player.points / (maxPlayerPointsPerMatch * nFinishedRounds) : 0
    const lastSeasonPointsScore = player.pointsLastSeason / maxPlayerPointsInSeason
    const factor = nFinishedRounds / nRoundsInSeason
    player.pointsScore = currentSeasonPointsScore * factor + lastSeasonPointsScore * (1 - factor)

    player.pointsHomeAvg = player.pointsHome / player.playedHome
    player.pointsAwayAvg = player.pointsAway / player.playedAway
    player.playedTotal = player.playedHome + player.playedAway
    player.pointsAvg = player.points / player.playedTotal
  }

  #postEval(player) {
    // Apply health status
    if (player.status === 'injured') {
      player.perfEval = 0
    } else if (player.status === 'doubt') {
      player.perfEval = player.perfEval / 2
    }

    // Additional checks
    if (player.price === 150000) {
      player.perfEval = 0
    }
  }

}

export default Analyst
