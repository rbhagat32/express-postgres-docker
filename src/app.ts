import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "@/routes/user.js";
import { errorHandler } from "@/middlewares/error-handler.js";
import { pool } from "@/config/db.js";

const app = express();
dotenv.config({ path: ".env" });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (_req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.status(200).send(`Current database: ${result.rows[0].current_database}`);
});

// routes
app.use("/api/user", userRouter);

// custom error handler
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
