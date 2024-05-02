import { NextFunction, Request, Response } from "express";

export const superAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.tokenData.name !== "super_admin") {
            return res.status(401).json(
                {
                    success: false,
                    message: "UNAUTHORIZED"
                }
            )
        }
        next();
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "you dont have permisions"
            }
        )
    }
}