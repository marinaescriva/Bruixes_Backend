import { Request, Response } from 'express';
import { Reserva } from '../models/Reserva';
import { ReservaMesa } from '../models/ReservaMesa';
import { Mesa } from '../models/Mesa';
import { Juego } from '../models/Juego';
import { ReservaJuego } from '../models/ReservaJuego';

export const getAllReservas = async (req: Request, res: Response) => {
    try {
        const reservas = await Reserva.find({
            select: {
                id: true,
                idUsuario: true,
                idReservaMesa: true,
                idReservaJuego: true,
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
        const idUsuario = req.tokenData.id;
        const { idMesa, idJuego, fechaHoraInicio } = req.body;

        console.log("aqui")

        if (!idUsuario) {
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

        // Crear una asociación entre la reserva_mesa y la mesa seleccionada
        const reservaMesa = new ReservaMesa();
        reservaMesa.idMesa = idMesa
        await reservaMesa.save();

        console.log("aqui", 3)

         // Crear una nueva reserva
         const reserva = new Reserva();
         reserva.idUsuario = idUsuario;
         reserva.fechaHoraInicio = fechaHoraInicio;
         reserva.idReservaMesa = reservaMesa.id;
         await reserva.save()

        console.log("aqui", 3.4)

        reserva.idReservaMesa = reservaMesa.id;
        await reserva.save();

        console.log("aqui", 4)

        // Si se proporcionó un juego, reservarlo también
        if (idJuego) {
            const juego = await Juego.findOne({ where: { id: idJuego, isAvailable: true } });

            if (!juego) {
                return res.status(400).json({
                    success: false,
                    message: "El juego seleccionado no está disponible"
                });
            }

            // Crear una nueva instancia de ReservaJuego y asociarla con el juego seleccionado
            const reservaJuego = await ReservaJuego.create({
                idJuego: idJuego
            }).save();

            // Asociar la reservaJuego con la reserva creada
            reserva.idReservaJuego = reservaJuego.id;
            await reserva.save();
        }


        // Devolver la respuesta con la reserva creada
        res.status(201).json({
            success: true,
            message: "Reserva creada exitosamente",
            data: {
                reserva: reserva,
                reservaMesa: reservaMesa,
                reservaJuego: idJuego ? idJuego : null
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