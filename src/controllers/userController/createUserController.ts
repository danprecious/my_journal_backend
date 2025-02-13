import { Request, Response } from "express";
import prisma from "../../prisma/client.js";
import { hashPassword } from "../../services/passwordService.js";
import { createNewUser, findUser } from "../../services/userServices.js";
import { CreateUser, User } from "../../types/globalTypes.js";
import { catchError } from "../../utils/isError.js";
import {
  generateRefreshToken,
  generateToken,
} from "../../services/jwtToken.js";

export const createUserController = async (
  req: Request<{}, {}, User>,
  res: Response
) => {
  try {
    const { email, password, name } = req.body;

    console.log(password);

    console.log(name, email);

    const hashedPassword = await hashPassword(password);

    console.log(hashedPassword);

    const userExists = await findUser(email);

    if (userExists) {
      res.status(403).json({
        error: "User already exist",
      });
      return;
    }

    const newUser = await createNewUser({ email, hashedPassword, name });

    if (!newUser) {
      res.status(401).json({
        error: "Invalid inputs, user could not be created",
      });
      return;
    }
    const generatedToken = generateToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);
    console.log(generatedToken);

    res.cookie("token", generatedToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      partitioned: true,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 14 * 24 * 60 * 60 * 1000,
      partitioned: true,
    });

    res.status(200).json({
      message: "User successfully registered",
    });
    return;
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error creating user, please try again",
    });
    return;
  }
};
