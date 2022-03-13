
const defaultMinPrice = 0
const defaultMaxPrice = 100000000


module.exports.byPrice = (sales, min=defaultMinPrice, max=defaultMaxPrice) => {
  return sales.filter(sale => sale.price >= min && sale.price <= max)
}

module.exports.byPriceIncrement = (sales, min=0, max=100) => {
  return sales.filter(sale => sale.player.priceIncrement >= min && sale.player.priceIncrement <= max )
}

module.exports.byWhitelist = (sales, whitelist=[]) => {
  return sales.filter(sale => whitelist.includes(sale.player.name))
}

module.exports.byFitness = (sales, fitness=0) => {
  return sales.filter(sale => (sale.player.fitnessValue) >= fitness)
}

module.exports.byPointsPerMatch = (sales, min=0, max=100) => {
  return sales.filter(sale => sale.player.pointsPerMatch >= min && sale.player.pointsPerMatch <= max )
}

module.exports.merge = ([lists]) => {
  const result = []
  lists.forEach(list => result.push(list))
  return [...new Set(result)];
}
