import type { NextFunction, Request, Response } from "express";
import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
});

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

export { validateUser };
