import { Request, Response } from "express";
import { deleteJournal } from "services/journalServices.js";
import { catchError } from "../../utils/isError.js";

export const deleteJournalController = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const delJournal = await deleteJournal(id);
    res.status(200).json({
        deletedJournal: delJournal 
    })
  } catch (error) {
    catchError(error, "Error deleting journal")
  }
};
