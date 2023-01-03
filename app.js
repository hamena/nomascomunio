import leagueModel from './model/league_model.js'
import teamModel from './model/team_model.js'
import marketModel from './model/market_model.js'
import Analyst from './team/analyst.js'
import Coach from './team/coach.js'
import { playerPositions } from './api/basics_api.js'
import Manager from './team/manager.js'
import bwapi from './api/api.js'


const app = async () => {
  try {
    await teamModel.fetch()
    // console.info('team players:', teamModel.getPlayers())
    // console.info('lineup:', teamModel.getLineup())
    
    await leagueModel.fetch()
    // console.info('Rounds:', leagueModel.getRounds())
    // console.info('Players:', leagueModel.getPlayers())

    await marketModel.fetch()
    // console.info('Balance:', marketModel.getBalance(), 'Max bid:', marketModel.getMaxBid())
    // console.info('Market sales', marketModel.getSales())
    // console.info('Market offers', marketModel.getOffers())

    // TEST ANALYST
    const analyst = new Analyst(leagueModel)
    teamModel.getPlayers().forEach(playerId => {
      const player = leagueModel.getPlayer(playerId)
      if (player !== undefined) {   
        analyst.evalPlayer(player)
        printPlayer(player)
      } else {
        console.error('Undefined player! ID:', playerId)
      }
    })

    // TEST COACH
    const coach = new Coach(leagueModel, teamModel, analyst)
    const lineups = coach.bestLineups()
    const lineupsArray = Object.values(lineups)
    lineupsArray.forEach(lineup => printLineup(lineup))
    lineupsArray.sort((a, b) => b.perfEval - a.perfEval)
    const bestLineup = lineupsArray[0]
    console.info('Best lineup: ')
    printLineup(bestLineup)
    // wbapi.putLineUp(bestLineup.type, bestLineup.lineup)

    // TEST MANAGER
    const manager = new Manager(leagueModel, marketModel, analyst)
    manager.critics(bestLineup)

    /* Fases del MANAGER
     * 1. Aceptar ofertas por jugadores que no estén alineados y que no estén al alza por 50K o más
     * 2. Cubrir posiciones en estado CRITIC (null o perf==0), algoritmo de voraz la mochila usando el valor/peso.
     * 3. Si no habia posiciones CRITIC entonces mejorar plantilla actual: 
     *      Aumentar perf haciendo swap (poner en oferta a X jugador a la vez que se realiza la puja por otro mejor en el mercado). 
     *      Si la puja fué ganadora entonces al dia siguiente el jugador será vendido en la fase 1
     * 4. Si no habia posiciones CRITIC entonces especular: 
     *      Pujar por jugadores que estén al alza por 70K o más 
     */
  
    /* Información derivada
     *    - priceunits: precio / 150000
     *    - valueQuality: priceunits / performance
     *    - estimated current price units
     */
    
    /* Como calcular las pujas
     *    
     */

  } catch (error) {
    console.error('Oopsss this error should not be here!', error)
  }
}

function printLineup(lineup) {
  const players = lineup.lineup.map(playerId => leagueModel.getPlayer(playerId)).filter(player => player !== undefined)
  const keepers = players.filter(player => player.position === playerPositions.keeper)
  const defenders = players.filter(player => player.position === playerPositions.defender)
  const midfielders = players.filter(player => player.position === playerPositions.midfielder)
  const forwards = players.filter(player => player.position === playerPositions.forward)
  var keepersStr = 'KP: '
  var defendersStr = 'DF: '
  var midfieldersStr = 'MF: '
  var forwardsStr = 'FW: '
  keepers.forEach(keeper => keepersStr += keeper.slug+', ')
  defenders.forEach(defender => defendersStr += defender.slug+', ')
  midfielders.forEach(midfielder => midfieldersStr += midfielder.slug+', ')
  forwards.forEach(forward => forwardsStr += forward.slug+', ')
  console.info('--------', lineup.type, '-', lineup.perfEval, '--------')
  console.info(keepersStr)
  console.info(defendersStr)
  console.info(midfieldersStr)
  console.info(forwardsStr)
}

function printPlayer(player) {
  console.info('-------------------------------------------')
  console.info(positionName[player.position], '['+player.id+']', player.slug, 'PERF:', player.perfEval)
  console.info('Value:', player.price, player.priceIncrement)
  console.info('Points:', player.points, 'H('+player.pointsHome+')', 'A('+player.pointsAway+') -', 'Last season:', player.pointsLastSeason)
  console.info('Points score:', player.pointsScore)
  console.info('Fitness:', player.fitness, '- Gradient:', player.fitnessGradient, 'Prediction:', player.fitnessPrediction)
  console.info('Fitness score:', player.fitnessScore)
}

const positionName = {
  '0': 'none', '1': 'KP', '2': 'DF', '3': 'MF', '4': 'FW', '5': 'COACH'
}

// app()

import fs from 'fs'
import { biwengeritoPlayers } from './team/knowledge.js'



const whosgone = async () => {

  await leagueModel.fetch()

  // const resp = await bwapi.getPlayerInfo('lewandowski')
  // const resp = await bwapi.getPlayerInfo('yeray-alvarez')
  // const resp = await bwapi.getPlayerInfo('alex-centelles')
  // fs.writeFileSync('./jsoncache/playerInfo.json', JSON.stringify((resp.data.data)))

  // const playerInfo = JSON.parse(fs.readFileSync('./jsoncache/playerInfo.json'))
  // const ownedSince = 0
  // // const ownedSince = 1662231600
  // const reports = playerInfo.reports.filter(report => report.match.date > ownedSince && report.rawStats !== undefined).map(report => report.rawStats.score5).reduce((sum, a) => sum + a, 0)
  // console.info(reports)
  

  // const resp = await bwapi.getOtherUserTeamInfo(3836843)
  // fs.writeFileSync('./jsoncache/otherUserTeamInfo.json', JSON.stringify((resp.data.data)))
  
  // const otherUserTeamInfo = JSON.parse(fs.readFileSync('./jsoncache/otherUserTeamInfo.json'))
  // const result = []
  
  // for (const iPlayer in otherUserTeamInfo.players) {
  //   const player = otherUserTeamInfo.players[iPlayer]
  //   const ownedSince = player.owner.date
  //   const playerSlug = leagueModel.getPlayer(player.id).slug

  //   const resp = await bwapi.getPlayerInfo(playerSlug)
  //   const playerInfo = resp.data.data
  //   const sum = playerInfo.reports.filter(report => report.match.date > ownedSince && report.rawStats !== undefined).map(report => report.rawStats.score5).reduce((sum, a) => sum + a, 0)
  //   result.push({ name: playerSlug, ownedSince: ownedSince, points: sum })
  // }

  // console.info(result)

  for (const iBiwengeritoPlayer in biwengeritoPlayers) {
    const biwengeritoPlayer = biwengeritoPlayers[iBiwengeritoPlayer]
    console.info('Procesing', biwengeritoPlayer.name)
    const respTeamInfo = await bwapi.getOtherUserTeamInfo(biwengeritoPlayer.id)
    const otherUserTeamInfo = respTeamInfo.data.data
    const result = []
    for (const iPlayer in otherUserTeamInfo.players) {
      const player = otherUserTeamInfo.players[iPlayer]
      const ownedSince = player.owner.date
      const playerSlug = leagueModel.getPlayer(player.id).slug
      
      console.info('\tInspecting', playerSlug)
      const resp = await bwapi.getPlayerInfo(playerSlug)
      const playerInfo = resp.data.data
      const sum = playerInfo.reports.filter(report => report.match.date > ownedSince && report.rawStats !== undefined).map(report => report.rawStats.score5).reduce((sum, a) => sum + a, 0)
      result.push({ name: playerSlug, ownedSince: ownedSince, points: sum })
    }
    result.sort((a, b) => b.points - a.points)
    biwengeritoPlayers[iBiwengeritoPlayer].players = result
  }

  fs.writeFileSync('./jsoncache/processedBiwengeritoPlayers.json', JSON.stringify(biwengeritoPlayers))

  biwengeritoPlayers.forEach(bwPlayer => {
    console.info('####', bwPlayer.name, '####')
    bwPlayer.players.forEach(player => {
      console.info('\t', player.name, player.points, 'puntos')
    })
  })
}

whosgone()
