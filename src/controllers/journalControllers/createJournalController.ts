import { catchError } from "../../utils/isError.js";
import { createJournal } from "../../services/journalServices.js";
import { CreateJournalInput } from "../../types/globalTypes.js";
import { Request, Response } from "express";

export const createJournalController = async (
  req: Request<{}, {}, CreateJournalInput>,
  res: Response
) => {
  const { title, content } = req.body;

  try {
    const journal = await createJournal({ title, content });
    
    res.status(200).json({
      message: "Journal created",
      journal: journal
    });
  } catch (error) {
    // catchError(error, "Journal could not be created")
    res.status(500).json({
      error: "Internal server error",
    });
    throw new Error("Internal Server error");
  }
};
