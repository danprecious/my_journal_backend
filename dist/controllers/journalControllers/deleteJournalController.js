import { deleteJournal } from "services/journalServices.js";
export const deleteJournalController = async (req, res) => {
    try {
        const { id } = req.body;
        const delJournal = await deleteJournal(id);
        res.status(200).json({
            deletedJournal: delJournal
        });
    }
    catch (error) {
        return res.status(500).json({
            error: "Internal server error: error deleting journal"
        });
    }
};
