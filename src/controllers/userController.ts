import { Request, Response } from "express";
import { User } from "../models/User";
// import { TokenData } from "../types";


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({

            select: {
                id: true,
                nombre: true,
                email: true, //no password
                createdAt: true,
                updatedAt: true
            }
        });

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getMyProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.id;
        const user = await User.findOne({
            where: {
                id: userId
            },
            select: {
                id: true,
                nombre: true,
                email: true,
                createdAt: true,
                updatedAt: true
            }

        })

        if (!userId) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const id = req.tokenData.id;

        const nombre = req.body.nombre;
        const email = req.body.email;

        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (email) {
            if (!validEmail.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: "format email invalid",
                });
            }
        }

        const userEmail = await User.findOne({
            where: {
                email: email,
            },
        });

        if (userEmail) {
            throw new Error("Email already in use");
        }

        const userUpdated = await User.update(
            {
                id: id,
            },

            {
                nombre: nombre,
                email: email,
            }
        );

        const userEmailUpdated = await User.findOne({
            where: { id },
            select: ['nombre', 'email']
        });

        res.status(201).json({
            success: true,
            message: "User updated",
            data: userEmailUpdated,
        });

        console.log(userUpdated, "actualizado");

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        // const id_role = req.tokenData.id_role;

        const userDeleting: any = await User.findOneBy({
            id: id,
          });
          console.log(userDeleting);


        if (userDeleting.id === 1) {
            res.status(401).json({
                success: false,
                message: "superadmin cant be deleted"
            });
            return;

        }

        if (!userDeleting) {
            res.status(404).json({
                succes: false,
                message: "user not found",
            });
        }

        await User.delete({
            id: id
        });

        res.status(200).json({
            "success": true,
            "message": "User deleted successfuly"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}