import { Request, Response } from 'express';
import { Reserva } from '../models/Reserva';

export const getAllReservas = async (req: Request, res: Response) => {
    try {
        const reservas = await Reserva.find({
            select: {
                id: true,
                idUsuario: true,
                idReservaMesa: true,
                idReservaJuego: true,
                idEvento: true,
                fechaHoraInicio: true,
                fechaHoraFin: true,
            }
        });

        res.status(200).json({
            success: true,
            data: reservas
        });

        if (!reservas) {
            res.status(404).json({
                success: false,
                message: "Any reservation found"
            });
            return;
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};