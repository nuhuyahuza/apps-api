import { Sequelize } from 'sequelize'
import dbConfig from '../config/dbConfig'


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

export default sequelize
