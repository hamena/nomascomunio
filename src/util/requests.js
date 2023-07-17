const config = require('../requests/config');

module.exports.configReq = (toAppend) => {
  return {
    headers: this.headers(),
    ...toAppend,
  };
};

module.exports.headers = () => {
  const headers = {};
  if (config.jwt) headers['Authorization'] = `Bearer ${config.jwt}`;
  if (config.league) headers['X-League'] = config.league;
  if (config.user) headers['X-User'] = config.user;
  if (config.version) headers['X-Version'] = config.version;
  if (config.lang) headers['X-Lang'] = config.lang;
  if (config.userAgent) headers['User-Agent'] = config.userAgent;
  return headers;
};

module.exports.endpoints = {
  authLogin: config.baseUrl + '/auth/login',
  account: config.baseUrl + '/account',
  market: config.baseUrl + '/market',
  competitionsLaLigaData: config.baseUrl + '/competitions/la-liga/data',
};
