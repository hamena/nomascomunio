require('dotenv').config()
const filter = require("./util/filter")
const api = require("./requests/api")

run = async () => {
  try {
    await api.login()
    await api.fetch()
    api.process()

    const minPrice = 5000000
    const minPriceIncrement = 100000
    const whitelist = ['Memphis Depay', 'Mojica', 'Jordán', 'Gerard Moreno', 'Aubameyang']
    const minFitness = 30
    const minPointsPerMatch = 6

    const byPrice = filter.byPrice(api.market.sales, minPrice)
    const byPriceIncrement = filter.byPriceIncrement(api.market.sales, minPriceIncrement)
    const byWhitelist = filter.byWhitelist(api.market.sales, whitelist)
    const byFitness = filter.byFitness(api.market.sales, minFitness)
    const byPointsPerMatch = filter.byPointsPerMatch(api.market.sales, minPointsPerMatch)

    const filteredSales = filter.merge([byPrice, byPriceIncrement, byWhitelist, byFitness, byPointsPerMatch])
    
    filteredSales.forEach(sale => {
      const increment = sale.player.priceIncrement
      const nHome = sale.player.playedHome
      const nAway = sale.player.playedAway
      console.info("----------------------------")
      console.info("\t", sale.player.name)
      console.info("----------------------------")
      console.info("  Value:", sale.player.price, "Price:", sale.price, increment >= 0 ? "+"+increment : increment)
      console.info("  Matches:", nHome + nAway, "H("+nHome+") V("+nAway+")")
      console.info("  Fitness:", sale.player.fitness, "Value:", sale.player.fitnessValue)
      console.info("  Points:", sale.player.points, "PPM:", sale.player.pointsPerMatch)
      console.info("----------------------------")
      console.info("")
    })

  } catch (error) {
    console.error('Error while running:', error)
  }
}

run()
