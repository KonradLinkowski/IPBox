const express = require('express')
const path = require('path')
const database = require('./database')
const { getIPInfo } = require('./ipinfo')
const PORT = 3214

const app = express()

app.get('/', async (req, res) => {
  try {
    const ip = req.header('x-forwarded-for') || req.connection.remoteAddress
    const ipinfo = await getIPInfo(ip)
    database.addEntry({
      ip,
      country: ipinfo.country,
      latitude: ipinfo.latitude,
      longitude: ipinfo.longitude,
      organization: ipinfo.org,
      postalCode: ipinfo.postal,
      region: ipinfo.region
    })
  } catch (error) {
    console.log(error)
  }
  res.sendFile(path.join(__dirname, './index.html'))
})

app.get('/info', async (req, res) => {
  const data = await database.getAll()
  res.json(data)
})

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
