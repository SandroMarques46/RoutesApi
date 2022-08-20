const {Pool, types} = require("pg")

//https://github.com/brianc/node-pg-types
//With this line of code , decimal values from DB queries will be forced to be parsed to float data type
//instead of the default behaviour which is using String data type (for safety reasons)
types.setTypeParser(1700, val => parseFloat(val))

const connectionOptions = {connectionString: process.env.DATABASE_URL}

const pool = (() => {
    return new Pool(connectionOptions)
})()

module.exports = {
    connectionOptions,
    pool
}