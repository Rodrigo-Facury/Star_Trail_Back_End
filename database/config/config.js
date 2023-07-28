require('dotenv').config();
const fs = require('fs');

module.exports = {
  development: {
    username: process.env.DBUSERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOSTNAME,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  homolog: {
    username: process.env.HM_DBUSERNAME,
    password: process.env.HM_PASSWORD,
    database: process.env.HM_DATABASE,
    host: process.env.HM_HOSTNAME,
    port: process.env.HM_DATABASE_PORT,
    dialect: 'postgres',
    protocol: 'postgres',
    ssl: false
  }
}
