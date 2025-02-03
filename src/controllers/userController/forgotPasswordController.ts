import { Request, Response } from "express";
import { findUser } from "services/userServices.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

const generateToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

const sendResetPasswordMail = (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    host: "",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "maddison53@ethereal.email",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });
};

export const forgotPaswordController = async (
  req: Request<{}, {}, { email: string }>,
  res: Response
) => {
  try {
    const { email } = req.body;

    console.log(email);

    const userExists = await findUser(email);

    if (!userExists) {
      res.status(401).json({ error: "This user doesn't exist" });
    }
  } catch (error) {
    console.log("Internal server error");
    res.status(500).json({ error: "Internal server error" });
  }
};
