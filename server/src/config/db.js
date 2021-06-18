// Connecting to database
const mysql = require('mysql')
require('dotenv').config()

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

con.connect((err) => {
 err ? console.log("database not connected.") : console.log('connected to database')
})

module.exports = con
