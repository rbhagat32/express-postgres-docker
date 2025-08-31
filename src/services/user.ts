import { pool } from "@/config/db.js";
import { v4 as uuid } from "uuid";

const getAllUsersService = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

const getUserByIdService = async (id: number) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

const createUserService = async (userData: { name: string; email: string }) => {
  const id = parseInt(uuid().split("-")[0], 16);

  const result = await pool.query(
    "INSERT INTO users (id, name, email) VALUES ($1, $2, $3) RETURNING *",
    [id, userData.name, userData.email]
  );

  return result.rows[0];
};

const updateUserByIdService = async (id: number, userData: { name: string; email: string }) => {
  const result = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [userData.name, userData.email, id]
  );

  return result.rows[0];
};

const deleteUserByIdService = async (id: number) => {
  const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};

export {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserByIdService,
  deleteUserByIdService,
};
