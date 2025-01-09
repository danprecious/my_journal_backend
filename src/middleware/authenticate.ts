import { NextFunction, Response, Request } from "express";
import { verifyToken } from "services/jwtToken.js";
import { catchError } from "utils/isError.js";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Access denied. malformed token" });
  }

  const token = authHeader?.split(" ")[1];

  if (typeof token === "string" && token) {
    try {
      const decodedToken = verifyToken(token); // Verify and decode the token
      (req as any).user = decodedToken; // Attach decoded user info to the request
      return next(); // Proceed to the next middleware
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token." });
    }
  }
};
