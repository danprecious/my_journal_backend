import { Request, Response } from "express";
import prisma from "../../prisma/client.js";
import { hashPassword } from "../../services/passwordService.js";
import { createNewUser, findUser } from "../../services/userServices.js";
import { CreateUser, User } from "../../types/globalTypes.js";
import { catchError } from "../../utils/isError.js";

export const createUserController = async (
  req: Request<{}, {}, User>,
  res: Response
) => {
  try {
    const { email, password, name } = req.body;

    console.log(password);

    const hashedPassword = await hashPassword(password);

    console.log(hashedPassword)

    const userExists = await findUser(email);

    if (userExists) {
     res.status(403).json({
        error: "User already exist",
      });
      return
    }

    const newUser = await createNewUser({ email, hashedPassword, name });

   res.status(200).json({
      message: "User successfully registered",
    });
    return
  } catch (error) {

      catchError(error, "Error creating user")
   res.status(500).json({
      error: "Error creating user, please try again",
    });
    return
  }
};
