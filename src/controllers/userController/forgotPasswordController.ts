import { Request, Response } from "express";
import { findUser } from "services/userServices.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import prisma from "prisma/client.js";

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

  const mailOptions = {
    to: email,
    subject: "Reset Password",
    text: `Click on the link to reset your password: https://myJournal.vercel.app/resetPassword?token=${token}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) console.error("Error sending mail", error);
  });
};

export const forgotPaswordController = async (
  req: Request<{}, {}, { email: string }>,
  res: Response
) => {
  try {
    const { email } = req.body;

    console.log(email);

    const user = await findUser(email);

    if (!user) {
      res.status(401).json({ error: "This user doesn't exist" });
    } else {
      const token = generateToken();
      const expiresAt = new Date(Date.now() + 3600 * 1000);
      const resetToken = await prisma.resetToken.create({
        data: {
          userId: user.id,
          token,
          expiresAt: expiresAt,
        },
      });
    }
  } catch (error) {
    console.log("Internal server error");
    res.status(500).json({ error: "Internal server error" });
  }
};
