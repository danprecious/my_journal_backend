import { Request, Response } from "express";
import { generateRefreshToken, generateToken } from "../../services/jwtToken.js";
import { comparedPassword } from "../../services/passwordService.js";
import { findUser } from "../../services/userServices.js";
import { UserSession, User, LoginUser } from "../../types/globalTypes.js";

export const loginUserController = async (
  req: Request<{}, {}, LoginUser>,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await findUser(email);

    if (!user) {
       res.status(401).json({
        error: "User not found. Don't have an account? Sign up",
      });
      return
    }

    const isMatch = await comparedPassword(password, user.password);

    if (!isMatch) {
      console.error("Passwords don't match");
      res.status(400).json({
        error: "Incorrect password",
      });
      return;
    }
 
    const generatedToken = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    const userSession: UserSession = {
      email: user.email,
      name: user.name,
      journals: [],
    };

    res.cookie('token', generatedToken, {
      httpOnly: true, 
      secure: true, 
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,  
      partitioned: true,
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 14 * 24 * 60 * 60 * 1000,
      partitioned: true
    })

    res.status(200).json({
      message: "Login successful",
      user: userSession,
    });
    return;
  } catch (error) {
    console.error(error);
     res.status(500).json({
      error: "Internal server error, try again",
    });
    return
  }
};
