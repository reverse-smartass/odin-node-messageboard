import  { Pool } from 'pg';


// Use a connection string (common on platforms like Render/Heroku)
// OR use an object with individual credentials
const pool =  new Pool({
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST_INTERNAL || process.env.DB_HOST,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: false 
    }
  });


export default pool;

