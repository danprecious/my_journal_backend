import { hashPassword } from "services/passwordService.js";
import { createNewUser, findUser } from "services/userServices.js";
export const createUserController = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const hashedPassword = await hashPassword(password);
        const userExists = await findUser(email);
        if (userExists) {
            res.status(403).json({
                error: "User already exist",
            });
            return;
        }
        const newUser = await createNewUser({ email, hashedPassword, name });
        res.status(200).json({
            message: "User successfully registered",
            user: {
                newUser,
            },
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            error: "Error creating user, please try again",
        });
        return;
    }
};
