import { JwtPayload } from "jsonwebtoken";

export interface CreateJournalInput {
  title: string;
  content: string;
}

export interface UpdateJournal {
  id: string;
  title: string;
  content: string;
}

export interface Journal {
  title: string;
  content: string;
}

export interface CreateUser {
  email: string;
  name: string | null;
  hashedPassword: string;
}

export interface User {
  // name: string;
  email: string;
  name: string | null;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface UserSession {
  email: string;
  name: string | null;
  journals: [];
}

export interface JWTPayload {
  id: string;
  iat: number;
  exp: number;
}

export interface RefreshToken {
  userId: string;
  token: string;
  expiresAt: Date;
}

export const users: User[] = [];
