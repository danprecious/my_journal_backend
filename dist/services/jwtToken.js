import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);
export const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
};
export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
