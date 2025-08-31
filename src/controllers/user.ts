import type { Request, Response } from "express";
import { tryCatch } from "@/utils/try-catch.js";
import { ErrorHandler } from "@/middlewares/error-handler.js";
import {
  getAllUsersService,
  getUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
  createUserService,
} from "@/services/user.js";

const getAllUsers = tryCatch(async (_: Request, res: Response) => {
  const users = await getAllUsersService();

  return res.status(200).json(users);
});

const getUserById = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserByIdService(Number(id));

  if (!user) throw new ErrorHandler(404, "User not found !");
  return res.status(200).json(user);
});

const createUser = tryCatch(async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const newUser = await createUserService({ name, email });

  if (!newUser) throw new ErrorHandler(400, "User not created !");
  return res.status(201).json(newUser);
});

const updateUser = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const updatedUser = await updateUserByIdService(Number(id), { name, email });

  if (!updatedUser) throw new ErrorHandler(404, "User not found !");
  return res.status(200).json(updatedUser);
});

const deleteUser = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedUser = await deleteUserByIdService(Number(id));

  if (!deletedUser) throw new ErrorHandler(404, "User not found !");
  return res.status(200).json(deletedUser);
});

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
