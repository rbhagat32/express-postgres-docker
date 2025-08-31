import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "@/controllers/user.js";
import { validateUser } from "@/middlewares/validate-user.js";

const router = express.Router();

router.get("/all", getAllUsers);
router
  .get("/:id", getUserById)
  .post("/", validateUser, createUser)
  .put("/:id", validateUser, updateUser)
  .delete("/:id", deleteUser);

export { router as userRouter };
