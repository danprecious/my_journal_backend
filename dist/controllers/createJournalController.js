import { createJournal } from "../services/journalServices";
export const createJournalController = (req, res) => {
    const { title, content } = req.body;
    try {
        const journal = createJournal({ title, content });
        res.status(200).json({
            message: "Journal created",
        });
    }
    catch (error) { }
};
