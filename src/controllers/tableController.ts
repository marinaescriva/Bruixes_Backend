import { Request, Response } from "express";
import { Mesa } from "../models/Mesa";



export const getAllTables = async (req: Request, res: Response) => {
    try {
        const mesas = await Mesa.find({ where: { isAvailable: true } });

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
};

export const deleteTable = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        const tableDeleting: any = await Mesa.findOneBy({
            id: id,
        });

        console.log(tableDeleting);

        if (!tableDeleting) {
            res.status(404).json({
                success: false,
                message: "Table not found"
            });
            return;
        }

        await Mesa.delete({
            id: id
        });

        res.status(200).json({
            success: true,
            message: "Table deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}