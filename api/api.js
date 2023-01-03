import * as dotenv from 'dotenv'
dotenv.config()

import axios from "axios"
import { scoreIds } from "./basics_api.js"

const baseUrl = "https://biwenger.as.com"
const endpoints = {
  apiV2User: baseUrl + '/api/v2/user',
  apiV2UserId: baseUrl + '/api/v2/user/:userid',
  apiV2CompetitionsLaLigaData: baseUrl + '/api/v2/competitions/la-liga/data',
  apiV2PlayersLaLigaPlayer: baseUrl + '/api/v2/players/la-liga/:playerslug',
  apiV2Market: baseUrl + '/api/v2/market',
  apiV2Offers: baseUrl + '/api/v2/offers'
}

class BiwengerApi {

  #headers

  constructor(jwt, userid, leagueid) {
    if (!jwt) throw new Error('JWT cannot be undefined')
    if (!userid) throw new Error('User ID cannot be undefined')
    if (!leagueid) throw new Error('League ID cannot be undefined')
    this.#headers = {
      'Authorization': 'Bearer ' + jwt,
      'X-User': userid,
      'X-League': leagueid
    }
  }

  async getLaLigaInfo() {
    const params = {
      score: scoreIds.sofascoreAsAvg
    }
    return await axios.get(endpoints.apiV2CompetitionsLaLigaData, {headers: this.#headers, params: params})
  }

  // fields=*,team,fitness,reports(points,home,events,status(status,statusInfo),match(*,round,home,away),star),prices,competition,seasons,news,threads
  async getPlayerInfo(playerSlug, fields='fields=*,team,fitness,reports(points,home,events,status(status,statusInfo),match(*,round,home,away),star),prices') {
    if (!playerSlug) throw new Error('Player slug must be defined')
    const params = {
      fields: fields
    }
    const playersLaLigaEndpoint = endpoints.apiV2PlayersLaLigaPlayer.replace(':playerslug', playerSlug)
    return await axios.get(playersLaLigaEndpoint, {headers: this.#headers, params: params})
  }

  async getTeamInfo(fields='*,lineup(type,playersID,reservesID,coach,date),players(id)') {
    const params = {
      fields: fields
    }
    return await axios.get(endpoints.apiV2User, { headers: this.#headers, params: params })
  }

  async getOtherUserTeamInfo(userId, fields='*,account(id),players(id,owner),lineups(round,points,count,position),league(id,name,competition,type,mode,marketMode,scoreID),market,seasons,offers,lastPositions') {
    const params = {
      fields: fields
    }
    const userIdEndpoint = endpoints.apiV2UserId.replace(':userid', userId)
    return await axios.get(userIdEndpoint, { headers: this.#headers, params: params })
  }
  
  async putLineUp(type='', lineup = []) {
    // validateLineUpType(type)
    // validateLineUp(lineup)
    const body = {
      lineup: {
        type: type,
        playersID: lineup,
        reservesID:[]
      }
    }
    return await axios.put(endpoints.apiV2User, body, { headers: this.#headers })
  }

  async getMarketInfo() {
    return await axios.get(endpoints.apiV2Market, { headers: this.#headers })
  }

  async postOffer(playerid, amount, to=null) {
    if (!playerid || playerid <= 0) throw new Error('Playerid must be defined and positive')
    if (!amount || amount <= 0) throw new Error('Amount must be defined and positive')
    const body = {
      amount: amount,
      requestedPlayers: [ playerid ],
      to: to,
      type: "purchase"
    }
    return await axios.post(endpoints.apiV2Offers, body, { headers: this.#headers })
  }

  async putOffer(offerid, status) {
    if (!offerid || offerid <= 0) throw new Error ('Offer ID must be defined and positive')
    if (!status) throw new Error ('Status must be defined')
    if (status !== 'accepted' && status !== 'rejected') throw Error ('Invalid value "'+status+'" for status argument. Accepted values for status: "accepted", "rejected"')
    const body = {
      status: status
    }
    return await axios.put(endpoints.apiV2Offers, body, { headers: this.#headers })
  }

  async postSale(playerid, amount) {
    if (!playerid || playerid <= 0) throw new Error('Playerid must be defined and positive')
    if (!amount || amount <= 0) throw new Error('Amount must be defined and positive')
    const body = {
      player: playerid,
      price: amount,
      type: 'sell'
    }
    return await axios.post(endpoints.apiV2Market, body, { headers: this.#headers })
  }

}

const authToken = process.env.AUTH_TOKEN
const userId = process.env.USER_ID
const leagueId = process.env.LEAGUE_ID

console.info('jwt:', authToken)
console.info('userId:', userId)
console.info('leagueId:', leagueId)

const bwapi = new BiwengerApi(authToken, userId, leagueId)
export default bwapi
