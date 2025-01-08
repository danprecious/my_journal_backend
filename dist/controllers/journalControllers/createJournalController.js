import { createJournal } from "../../services/journalServices.js";
export const createJournalController = async (req, res) => {
    const { title, content } = req.body;
    try {
        const journal = await createJournal({ title, content });
        res.status(200).json({
            message: "Journal created",
            journal: journal
        });
    }
    catch (error) {
        // catchError(error, "Journal could not be created")
        res.status(500).json({
            error: "Internal server error",
        });
        throw new Error("Internal Server error");
    }
};
