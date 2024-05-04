import { Request, Response } from 'express';
import { Reserva } from '../models/Reserva';
import { Mesa } from '../models/Mesa';
import { Juego } from '../models/Juego';


export const getAllReservas = async (req: Request, res: Response) => {
    try {
        const reservas = await Reserva.find({
            select: {
                id: true,
                idUsuario: true,
                idMesa: true,
                idJuego: true,
                idEvento: true,
                fechaHoraInicio: true
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

export const newReserva = async (req: Request, res: Response) => {
    try {
        const { idMesa, idJuego, idEvento, fechaHoraInicio, fechaHoraFin } = req.body;

        // Verificar si los parámetros requeridos están presentes
        if (!idMesa || !fechaHoraInicio || !fechaHoraFin) {
            return res.status(400).json({
                success: false,
                message: "Faltan parámetros requeridos"
            });
        }

        // Buscar y reservar la mesa
        const mesa = await Mesa.findOne({
            where: {
                isAvailable: true,
                id: idMesa
            }
        });

        if (!mesa) {
            return res.status(400).json({
                success: false,
                message: "La mesa seleccionada no está disponible"
            });
        }

        mesa.isAvailable = false;
        await mesa.save();

        // Si se proporcionó un juego, reservarlo también
        if (idJuego) {
            const juego = await Juego.findOne({
                where: {
                    id: idJuego,
                    isAvailable: true
                }
            });

            if (!juego) {
                return res.status(400).json({
                    success: false,
                    message: "El juego seleccionado no está disponible"
                });
            }

            juego.isAvailable = false;
            await juego.save();
        }

        // Crear una nueva reserva
        const reserva = new Reserva();
        reserva.idUsuario = req.tokenData.id;
        reserva.fechaHoraInicio = fechaHoraInicio;
        reserva.fechaHoraFin = fechaHoraFin;
        reserva.idMesa = idMesa;

        if (idJuego) {
            reserva.idJuego = idJuego;
        }

        await reserva.save();

        // Devolver la respuesta con la reserva creada
        res.status(201).json({
            success: true,
            message: "Reserva creada exitosamente",
            data: {
                reserva: reserva,
                mesa: idMesa,
                juego: idJuego ? idJuego : null,
                evento: idEvento ? idEvento : null
            }
        });
    } catch (error) {
        
        console.error("Error al crear la reserva:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        });
    }
};
