import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

console.log(JWT_SECRET);

export const generateToken = (userId: string): string => {
  const token = jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

export const generateRefreshToken = (userId: string) => {
  const token = jwt.sign({userId}, JWT_SECRET, {expiresIn: '14d'});
  return token;
}

export const verifyToken = (token: string ): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload ;
};


