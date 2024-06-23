import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "login",
  });
};

export const signup = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "Signup",
  });
};

export const logout = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "Logout",
  });
};
