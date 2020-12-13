const axios = require('axios')

const cache = {}

const getIPInfo = async ip => {
  if (ip in cache) {
    return cache[ip]
  }
  const info = (await axios.get(`https://ipapi.co/${ip}/json`)).data
  cache[ip] = info
  return info
}

module.exports = {
  getIPInfo
}
