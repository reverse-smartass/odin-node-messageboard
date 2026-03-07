import pg from 'pg';
const { Client } = pg;

// Use a connection string (common on platforms like Render/Heroku)
// OR use an object with individual credentials
const getConnection = () => {
  console.log("Creating new database connection... " + process.env.DB_URL);
  return new Client({
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST_INTERNAL || process.env.DB_HOST,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: false 
    }
  });
};

export default getConnection;

