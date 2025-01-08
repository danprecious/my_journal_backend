import { generateToken } from "services/jwtToken.js";
import { comparedPassword } from "services/passwordService.js";
import { findUser } from "services/userServices.js";
export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUser(email);
        if (!user) {
            res.status(401).json({
                error: "User not found. Don't have an account? Sign up",
            });
            return;
        }
        const isMatch = await comparedPassword(password, user.password);
        if (!isMatch) {
            console.error("Passwords don't match");
            res.status(400).json({
                error: "Incorrect password",
            });
            return;
        }
        const generatedToken = generateToken(user.id);
        const userSession = {
            email: user.email,
            name: user.name,
            journals: [],
            token: generatedToken,
        };
        res.status(200).json({
            message: "Login succesful",
            user: userSession,
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal server error, try again",
        });
        return;
    }
};
