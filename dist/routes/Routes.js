import express from "express";
import { loginUserController } from "../controllers/userController/loginUserController.js";
import { createJournalController } from "../controllers/journalControllers/createJournalController.js";
export const router = express.Router();
router.get("/test", (req, res) => {
    console.log("api reached");
    res.status(200).json({
        message: "api reached",
    });
});
router.post("/createJournal", createJournalController);
router.post("/login", loginUserController);
export default router;
