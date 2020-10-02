const express = require('express')
const path = require('path')
const database = require('./database')
const { getIPInfo } = require('./ipinfo')
const PORT =  process.env.PORT || 3214

const app = express()

app.use('/assets', express.static(path.join(__dirname, '..', 'public', 'assets')))

app.get('/', async (req, res) => {
  const ip = req.header('x-forwarded-for') || req.connection.remoteAddress
  try {
    const ipinfo = await getIPInfo(ip)
    await database.addEntry({
      ip,
      country: ipinfo.country_name,
      latitude: ipinfo.latitude,
      longitude: ipinfo.longitude,
      organization: ipinfo.org,
      postalCode: ipinfo.postal,
      region: ipinfo.region
    })
  } catch (error) {
    if (error.code === 11000) {
      console.log('Duplicated IP', ip)
    } else if (error.response && error.response.status === 429) {
      console.error(error.message)
    } else {
      console.error(error)
    }
  }
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

app.get('/info', async (req, res) => {
  try {
    const data = await database.getAll()
    res.json(data.map((datum, i) => ({ ...datum, position: i + 1 })))
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
