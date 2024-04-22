import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const dbConfig = {
  host: process.env["DB_HOST"],//Tu host
  port: 5432,
  database: "restoraters",
  user: process.env["DB_USER"], //Tu usuario
  password: process.env["DB_PASS"], //Contraseña
};

// const dbConfig = {
//   user: "postgres",
//     host: "localhost",
//     password: "THIAGOSILVA",
//     database: "restoraters", // extended
//     port: 5432
// };

export const pool = new Pool(dbConfig);

export const query = (text: string, params?: (string | number | boolean)[]) => {
  return pool.query(text, params);
};
