import { Request, Response } from "express";

export const logoutController = async (req: Request, res: Response) => {
  const token = req.cookies?.token;

  console.log(token);

  try {
    res
      .status(200)
      .cookie("token", null, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: -7,
        path: "/",
      })
      .json({ message: "User succesfully logged out" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });

  }
};
