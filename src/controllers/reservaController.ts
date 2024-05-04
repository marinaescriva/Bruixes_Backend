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

        const { idMesa, idJuego, idEvento, fechaHoraInicio, fechaHoraFin} = req.body;

        console.log("aqui")

        if (!idMesa || !fechaHoraInicio || !fechaHoraFin) {
            return res.status(400).json({
                success: false,
                message: "Missing required parameters"
            });
        }
        console.log("aqui", 1)

        // Buscar mesa disponible
        const mesa = await Mesa.findOne(
            {
                where:
                {
                    isAvailable: true,
                    id: idMesa
                }
            }
        );

        if (!mesa) {
            return res.status(400).json({
                success: false,
                message: "No está disponible la mesa seleccionada"
            });
        }
        console.log("aqui", 2)


         // Crear una nueva reserva
         const reserva = new Reserva();
         reserva.idUsuario = req.tokenData.id;
         reserva.fechaHoraInicio = fechaHoraInicio;
         reserva.fechaHoraFin = fechaHoraFin;
         reserva.idMesa = idMesa;
         await reserva.save()

        console.log("aqui", 3.4)


        // Si se proporcionó un juego, reservarlo también
        if (idJuego) {
            const juego = await Juego.findOne({ where: { id: idJuego, isAvailable: true } });

            if (!juego) {
                return res.status(400).json({
                    success: false,
                    message: "El juego seleccionado no está disponible"
                });
            }

            // Asociar la reservaJuego con la reserva creada
            reserva.idJuego = idJuego;
            await reserva.save();
        }


        // Devolver la respuesta con la reserva creada
        res.status(201).json({
            success: true,
            message: "Reserva is successfully",
            data: {
                reserva: reserva,
                mesa: idMesa,
                juego: idJuego ? idJuego : null,
                evento: idEvento ? idEvento : null
            }
        });
    } catch (error) {
        // Manejar errores
        console.log("aqui", 5)
        console.error("Error al crear la reserva:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};