import { Request, Response } from "express";
import { Mesa } from "../models/Mesa";



export const getAllTables = async (req: Request, res: Response) => {
    try {
        const mesas = await Mesa.find();

        res.status(200).json({
            success: true,
            data: mesas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}