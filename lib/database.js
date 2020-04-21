const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const IPSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    unique: true
  },
  region: {
    type: String
  },
  country: {
    type: String
  },
  postalCode: {
    type: String
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  },
  organization: {
    type: String
  }
}, {
  timestamps: true
})

const IP = mongoose.model('IP', IPSchema)

const addEntry = async (data = {
  ip,
  region,
  country,
  postalCode,
  latitude,
  longitude,
  organization
}) => {
  return IP.create({
    ...data
  })
}

const getAll = async () => {
  return IP.find().sort({'createdAt': 1}).lean()
}

module.exports = {
  addEntry,
  getAll
}
