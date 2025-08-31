import pkg from "pg";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: Number(process.env.PG_PORT),
  // for neonDB (not reqd for postgres running in Docker)
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

pool.on("connect", () => {
  console.log("Connected to the PostgreSQL !");
});

pool.on("error", (err) => {
  console.error("Error connecting to PostgreSQL:", err);
  process.exit(-1);
});

export { pool };
