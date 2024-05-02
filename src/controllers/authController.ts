import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {

    try {
        const { nombre, email, password } = req.body;

        if ( !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are needed"
            })
        }

        if (password.length < 8 || password.length > 10) {
            return res.status(400).json({
                success: false,
                message: "password incorrect"
            })
        }

        const user = await User.findOne(
            {
                where: {
                    email: email
                },
            }
        );

        if (user) { 

            throw new Error("register cannot be completed");
        }

        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "format email invalid"
                }
            )
        }

        const hashedPassword = bcrypt.hashSync(password, 8);
            console.log(hashedPassword)

        const newUser = await User.create({

            nombre: nombre,
            email: email,
            password: hashedPassword

        }).save() 

        console.log(newUser)

        return res.status(201).json(
            {

                success: true,
                message: "user is registered"

            }
        )
        
        } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "the user can't be registered",
                error: error
            }
        );
        }

};

export const login = async (req: Request, res: Response) => {

    try {
        const email = req.body.email;
        const password = req.body.password;
        
        console.log(email)
        console.log(password)

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and/or password are required"
            })
        }

        const user = await User.findOne({
            where: {
                email: email,
            },
            select: {
                'id': true,
               'nombre': true,
                'password': true, 
               'email': true,
               'idRole': true,
            }
        })


        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Wrong user"
            })
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);

        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Email and password invalid"
            })
        }
        
        const token = jwt.sign({
            userId: user.id,
            role: user.idRole,
            name: user.nombre
        },
            process.env.JWT_SECRET as string,
            // {
            //     expiresIn: "9h"
            // }
        )

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: token,
            password: password,

        })
        

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cannot be logged in",
            error: error
        })
    }
};