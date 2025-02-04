import express from "express";
import { Request, Response } from "express";
import { loginUserController } from "../controllers/userController/loginUserController.js";
import { createJournalController } from "../controllers/journalControllers/createJournalController.js";
import { createUserController } from "../controllers/userController/createUserController.js";
import { authenticate } from "../middleware/authenticate.js";
import { forgotPaswordController } from "../controllers/userController/forgotPasswordController.js";

export const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  console.log("welcome");
  res.status(200).json({
    message: "api reached",
  });
});
router.get("/test", (req: Request, res: Response) => {
  console.log("api reached");
  res.status(200).json({
    message: "api reached",
  });
});

router.post("/createJournal", authenticate, createJournalController);

router.post("/createUser", createUserController)

router.post("/login", loginUserController);

router.post("/forgotPassword", forgotPaswordController);

export default router;
