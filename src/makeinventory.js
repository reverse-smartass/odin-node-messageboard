import "dotenv/config";
import pg from "pg";
import pool from "./db.js";

async function runSeed() {
  try {
    // 1. Fetch from API
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json(); // Assuming this is an array of objects

    if (data.length === 0) return;

    // 2. Identify the structure from the first object
    const columns = Object.keys(data[0]);
    const tableName = "inventory";

    const columnFlat = [];
    

    const columnDefs = columns
      .flatMap((key) => {
        const value = data[0][key];
        if (typeof value !== "object" || value === null) {
          const type = getTypeForSQL(key, value);

          columnFlat.push(`${key}`);
          
          return `"${key}" ${type}`;
        }

        if (!Array.isArray(value)) {
          return Object.keys(value).flatMap((objKey) => {
            const objType = getTypeForSQL(objKey, value[objKey]);

            columnFlat.push(`${key}_${objKey}`);
            
            return `"${key}_${objKey}" ${objType}`;
          });
        }
      })
      .join(", ");

    //console.log(columnDefs);
    console.log(columnFlat);

    /* await pool.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefs})`);

    // 4. Insert data
    for (const item of data) {
      const values = Object.values(item).flatMap((value) => {
        if (typeof value !== "object" || value === null) {
          return value;
        }

        if (!Array.isArray(value)) {
          return Object.values(value);
        }

        return [JSON.stringify(value)];
      });
      const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
      const sql = `INSERT INTO ${tableName} ("${columnFlat.join('", "')}") VALUES (${placeholders})`;

      //console.log(sql, values);
      await pool.query(sql, values);
    } */
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    await pool.end(); // Important! Closes the connection so the script can exit
  }
}

function getTypeForSQL(key, value) {
  if (key === "id") return "SERIAL PRIMARY KEY";
  if (typeof value === "number") return "NUMERIC(10,2)";
  if (typeof value === "string") return "TEXT";
}



runSeed();
