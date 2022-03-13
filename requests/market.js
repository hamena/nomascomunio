const { default: axios } = require("axios")
const { endpoints, configReq } = require("../util/requests")

module.exports.getMarket = async () => {
  const response = await axios.get(endpoints.market, configReq())
  return response.data
}
