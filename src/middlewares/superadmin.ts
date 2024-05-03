import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
export const superadmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.tokenData.id_role !== 1) {
            return res.status(401).json(
                {
                    success: false,
                    message: "UNAUTHORIZED"
                }
            )
        }
        next();
    } catch (error) {
        console.error("Error in superadmin middleware:", error);
    
        res.status(500).json({
            success: false,
            message: "you dont have permisions"
        });
    }
}