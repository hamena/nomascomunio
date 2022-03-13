const { default: axios } = require("axios")
const { endpoints, configReq } = require("../util/requests")

module.exports.postLogin = async (user, password) => {
  const response = await axios.post(endpoints.authLogin, {
    email: user,
    password: password
  })
  return response.data
}

module.exports.getAccount = async () => {
  const response = await axios.get(endpoints.account, configReq())
  return response.data
}
