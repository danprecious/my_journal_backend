import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Replace `any` with your decoded token type, e.g., `DecodedToken`
    }
  }
}