const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'turnosbeta',
  password: 'Colombia2023',
  port: 5432
})

module.exports = pool