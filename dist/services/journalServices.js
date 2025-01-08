import prisma from "../prisma/client.js";
import { catchError } from "../utils/isError.js";
export const createJournal = async ({ title, content }) => {
    try {
        const newJournal = await prisma.journal.create({
            data: { title, content },
        });
        return newJournal;
    }
    catch (error) {
        catchError(error, "Error creating a new journal");
    }
};
export const deleteJournal = async (id) => {
    try {
        const deletedJournal = await prisma.journal.delete({
            where: {
                id: id,
            },
        });
    }
    catch (error) {
        catchError(error, "Error deleting this journal");
    }
};
export const updateJournal = async ({ id, title, content }) => {
    try {
        const updatedJournal = await prisma.journal.update({
            where: { id: id },
            data: {
                title: title,
                content: content,
            },
        });
    }
    catch (error) {
        catchError(error, "Error updating this journal");
    }
};
