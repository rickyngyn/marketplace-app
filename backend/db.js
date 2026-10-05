const {Pool} = require("pg")

// Reduce env variables needed to connect to postgres
const pool = new Pool({connectionString: process.env.DATABASE_URL, ssl: true}); 

module.exports = pool;