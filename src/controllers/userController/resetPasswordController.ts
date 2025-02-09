import { Request, Response } from "express"

export const resetPasswordController = async (req: Request, res: Response ) => {
    
    
    try {
        const token = req.cookies?.token;
        if (!token) {
            res.status(401).json({error: "Invalid token"})
        } 

        
        
    } catch (error) {
        console.error("Internal server error", )
        res.status(500).json({
            error: "Internal server error"
        })    
    }
}