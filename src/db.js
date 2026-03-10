import  { Pool } from 'pg';
import 'dotenv/config';
console.log("Password type:", typeof process.env.DB_PASSWORD);
console.log("Password value exists:", !!process.env.DB_PASSWORD);

const pool =  new Pool({
    database: process.env.DB_INVENTORY_DATABASE,
    user: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PASSWORD,
    host: process.env.DB_LOCAL_HOST,
    port: process.env.DB_PORT,
  });


export default pool;

