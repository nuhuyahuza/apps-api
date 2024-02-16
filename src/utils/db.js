require('ts-node/register')
const Sequelize = require('sequelize')
const dbConfig = require('../config/dbConfiguration.js')

const { database, username, password, host, dialect, pool } = dbConfig.development

const sequelize = new Sequelize(
  database,
  username,
  password,
  {
    dialect,
    dialectOptions: {
      host,
      pool: {
        max: pool.max || 5,
        min: pool.min || 0,
        acquire: pool.acquire || 30000,
        idle: pool.idle || 10000
      }
    }
  }
)
console.log(sequelize)
module.exports = sequelize
