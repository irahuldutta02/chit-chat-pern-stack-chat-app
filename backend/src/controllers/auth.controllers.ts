import { Request, Response } from "express";
import prisma from "../db/prisma";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const login = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "login",
  });
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({
        status: 400,
        message: `${!fullName ? "fullName" : ""} , ${
          !username ? "username" : ""
        } , ${!password ? "password" : ""} , ${
          !confirmPassword ? "confirmPassword" : ""
        } , ${!gender ? "gender" : ""} is required`,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 400,
        message: "Password and Confirm Password should be same",
      });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: 400,
        message:
          "Password should be at least 6 characters, at most 16 characters, at least one number, one lowercase and one uppercase letter",
      });
    }

    if (gender !== "male" && gender !== "female") {
      return res.status(400).json({
        status: 400,
        message: "Gender should be 'male' or 'female' only",
      });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      return res.status(400).json({
        status: 400,
        message: "Username already exists",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await prisma.user.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      },
    });

    if (newUser) {
      generateToken(newUser.id, res);

      return res.status(200).json({
        status: 200,
        message: "User created successfully",
        data: {
          id: newUser.id,
          fullName: newUser.fullName,
          username: newUser.username,
          gender: newUser.gender,
          profilePic: newUser.profilePic,
        },
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "User not created",
      });
    }
  } catch (error: any) {
    console.log("Error is signup : ", error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "Logout",
  });
};
