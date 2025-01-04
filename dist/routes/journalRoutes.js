import express from 'express';
import { createJournalController } from "../controllers/createJournalController";
const router = express.Router();
router.get("/test", (req, res) => {
    console.log("api reached");
    res.status(200).json({
        message: "api reached",
    });
});
router.post("/createJournal", createJournalController);
export default router;
