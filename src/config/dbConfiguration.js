const { config } = require('dotenv')
config()

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_DIALECT,
  DB_POOL_MAX,
  DB_POOL_MIN,
  DB_POOL_ACQUIRE,
  DB_POOL_IDLE
} = process.env

module.exports = {
  development: {
    username: DB_USERNAME || 'root',
    password: DB_PASSWORD || '',
    database: DB_DATABASE || 'myapp_database',
    host: DB_HOST || '127.0.0.1',
    dialect: DB_DIALECT || 'mysql',
    pool: {
      max: DB_POOL_MAX || 5,
      min: DB_POOL_MIN || 0,
      acquire: DB_POOL_ACQUIRE || 30000,
      idle: DB_POOL_IDLE || 10000
    }
  },
  test: {
    username: DB_USERNAME || 'root',
    password: DB_PASSWORD || '',
    database: DB_DATABASE || 'myapp_database',
    host: DB_HOST || '127.0.0.1',
    dialect: DB_DIALECT || 'mysql',
    pool: {
      max: DB_POOL_MAX || 5,
      min: DB_POOL_MIN || 0,
      acquire: DB_POOL_ACQUIRE || 30000,
      idle: DB_POOL_IDLE || 10000
    }
  },
  production: {
    username: DB_USERNAME || 'root',
    password: DB_PASSWORD || '',
    database: DB_DATABASE || 'myapp_database',
    host: DB_HOST || '127.0.0.1',
    dialect: DB_DIALECT || 'mysql',
    pool: {
      max: DB_POOL_MAX || 5,
      min: DB_POOL_MIN || 0,
      acquire: DB_POOL_ACQUIRE || 30000,
      idle: DB_POOL_IDLE || 10000
    }
  }
}
