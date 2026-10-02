const {Pool} = require("pg")
const { connectionString } = require("pg/lib/defaults")

// Reduce env variables needed to connect to postgres
const pool = new Pool({connectionString: process.env.DATABASE_URL,}); 

module.exports = pool;