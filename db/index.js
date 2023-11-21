const {Pool}=require("pg");
const { param } = require("../routes");
const pool = new Pool({
    user: 'nurad',
    host: 'localhost',
    database: 'g_dev',
    password: 'mnbvcxz',
    port: 5432, // default PostgreSQL port
  });


  module.exports={
    
    query:async (text,params,callback) =>{
      
      const client= await pool.connect();

    return  await client.query("SELECT * FROM weather")

  },
  transaction:async (callback,args)=>{

    // Roll back should be worked on

    const client= await pool.connect();

    await client.query("BEGIN");

    callback(client,args);

    await client.query("COMMIT");

    client.release();


  }
}