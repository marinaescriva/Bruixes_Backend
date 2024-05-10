import { Request, Response } from 'express';
import { Reserva } from '../models/Reserva';
import { Mesa } from '../models/Mesa';
import { Juego } from '../models/Juego';
import { error } from 'console';


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
        const { idMesa, idJuego, idEvento, fechaHoraInicio } = req.body;

        // Verificar si los parámetros requeridos están presentes
        if (!idMesa || !fechaHoraInicio ) {
            return res.status(400).json({
                success: false,
                message: "Faltan parámetros requeridos",
                error: error
            });
        }

        // Buscar y reservar la mesa
        const mesa = await Mesa.findOne({
            where: {
                isAvailable: true,
                id: idMesa
            },
            relations:{
                reservas: {
                    juego: true
                }
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
                }, relations: {reservas:
                    { juego: true

                }}
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
        reserva.idMesa = idMesa;

        if (idJuego) {
            reserva.idJuego = idJuego;
        }

        await reserva.save();

        const reservaId = await Reserva.findOne({
            where: {
                id: reserva.id
            }, relations: { 
                mesa: true, juego: true
             }
        });

        // Devolver la respuesta con la reserva creada
        res.status(201).json({
            success: true,
            message: "Reserva creada exitosamente",
            data: {
                reservaId
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


export const getMyReservas = async (req: Request, res: Response) => {
    try {
        const reservas = await Reserva.find({
            where: {
                idUsuario: req.tokenData.id
            },
            select: {
                id: true,
                idUsuario: true,
                idMesa: true,
                idJuego: true,
                idEvento: true,
                fechaHoraInicio: true
            },
            relations: { 
                juego: true, 
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

export const deleteReservaById = async (req: Request, res: Response) => {
    try {
        const reservaId = parseInt(req.params.id); 
        const userId = req.tokenData.id;

        const reservaDeleting: any = await Reserva.findOneBy({
            id: reservaId,
        });

        console.log(reservaDeleting);

        if (!reservaDeleting) {
            res.status(404).json({
                success: false,
                message: "Reserva not found"
            });
            return;
        }

       
        if ((userId !== 1) && userId !== reservaDeleting.idUsuario) {
            res.status(403).json({
                success: false,
                message: "You are not authorized to delete this reserva"
            });
            return;
        }

     
        await Reserva.delete({
            id: reservaId
        });

        res.status(200).json({
            success: true,
            message: "Reserva deleted"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

