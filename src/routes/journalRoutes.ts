import express from 'express';
import { Request, Response } from "express";
import { createJournalController } from "../controllers/journalControllers/createJournalController.js";


const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  console.log("api reached");
  res.status(200).json({
    message: "api reached",
  });
});

router.post("/createJournal", createJournalController);

export default router;