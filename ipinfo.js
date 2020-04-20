const axios = require('axios')

const getIPInfo = async (ip) => {
  return (await axios.get(`https://ipapi.co/${ip}/json`)).data
}

module.exports = {
  getIPInfo
}
