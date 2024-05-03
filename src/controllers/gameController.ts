import { Request, Response } from "express";
import { Juego } from "../models/Juego";



export const getAllGames = async (req: Request, res: Response) => {
    try {
        const games = await Juego.find({

            select: {
                id: true,
                nombre: true,
                jugadores: true,
                isAvailable: true,
            }
        });

        res.status(200).json({
            success: true,
            data: games
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}