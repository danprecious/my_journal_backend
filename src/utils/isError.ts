export const isError = (error: unknown): error is Error => {
  return typeof error === "object" && error !== null && "message" in error;
};

export const catchError = (error: unknown, message: string) => {
  if (isError(error)) {
    console.error(message, error);
    throw error;
  } else {
    console.error("Unknown error", error);
    throw error;
  }
};
