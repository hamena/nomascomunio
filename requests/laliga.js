const { default: axios } = require("axios")
const { endpoints, configReq } = require("../util/requests")

module.exports.getLaLiga = async () => {
  const response = await axios.get(endpoints.competitionsLaLigaData, configReq())
  return response.data
}
