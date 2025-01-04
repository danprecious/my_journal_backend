export const isError = (error) => {
    return typeof error === "object" && error !== null && "message" in error;
};
export const catchError = (error, message) => {
    if (isError(error)) {
        console.error(message, error);
        throw error;
    }
    else {
        console.error("Unknown error", error);
        throw error;
    }
};
