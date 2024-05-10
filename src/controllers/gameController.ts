import { Request, Response } from "express";
import { Juego } from "../models/Juego";
import { parse } from "path";



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

export const deleteGame = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        const gameDeleting: any = await Juego.findOneBy({
            id: id,
        });

        console.log(gameDeleting);

        if (!gameDeleting) {
            res.status(404).json({
                success: false,
                message: "Game not found"
            });
            return;
        }

        await Juego.delete({
            id: id
        });

        res.status(200).json({
            success: true,
            message: "Game deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};