import { Request, Response } from "express";
import { findUser } from "services/userServices.js";
import crypto from 'crypto';



const generateToken = () =>  {
    return crypto.randomBytes(20).toString("hex");
}


const sendResetPasswordMail = (email: string, token:string) => {

}


export const forgotPaswordController = async (
  req: Request<{}, {}, { email: string }>,
  res: Response
) => {
  try {
    const { email } = req.body;

    console.log(email);

    const userExists = await findUser(email);

    if (userExists) {
// const token = 
    }
  } catch (error) {
    console.log("Internal server error");
    res.status(500).json({ error: "Internal server error" });
  }
};
