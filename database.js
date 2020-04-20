const { Sequelize, DataTypes } = require('sequelize')

const database = new Sequelize({
  dialect: 'sqlite',
  storage: 'store.sqlite'
})

const IP = database.define('IP', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  region: {
    type: DataTypes.STRING
  },
  country: {
    type: DataTypes.STRING
  },
  postalCode: {
    type: DataTypes.STRING
  },
  latitude: {
    type: DataTypes.NUMBER
  },
  longitude: {
    type: DataTypes.NUMBER
  },
  organization: {
    type: DataTypes.NUMBER
  }
}, {
  tableName: 'IPs'
})

IP.sync()

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
  return IP.findAll()
}

module.exports = {
  addEntry,
  getAll
}
