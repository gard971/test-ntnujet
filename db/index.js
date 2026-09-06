const { Pool } = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");

const schema = require("./schema")

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on("error", (err) => {
    console.error("Unexpected PostgeSQL error:", err);
})

const db = drizzle(pool, {
    schema
});

async function connectDatabase(){
    try{
        await pool.query("SELECT 1")
        console.log("connected to postgeSQL")
    } catch(err) {
        console.log("Could not connect to postgreSQL:");
        console.error(err)
        throw err;
    }
}

module.exports = {
    db, 
    pool,
    connectDatabase
};