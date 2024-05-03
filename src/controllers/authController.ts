import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {

    try {
        console.log(req.body, "entrando al register");
        const { nombre, email, password } = req.body;

        if ( !nombre || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Nombre, Email and password are needed"
            })
        }

        if (password.length < 6 || password.length > 10) {
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
        console.log(req.body, "2");

        if (user) { 

            throw new Error("register cannot be completed");
        }

        console.log(user, " esto da null , 3");

        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "format email invalid"
                }
            )
        }

        console.log(req.body, "4");

        if (password.length < 6 || password.length > 10 ) {
            throw new Error("Password has to be between 6 and 10 characters");
          }

          console.log(password, "password??");

        const hashedPassword = bcrypt.hashSync(password, 6);
            console.log(hashedPassword)
            console.log(req.body, "5");

            const newUser = new User();
            newUser.nombre = nombre;
            newUser.email = email;
            newUser.password = hashedPassword;
            newUser.idRole = 2;
            
            console.log(req.body, "6");
            await newUser.save();

            console.log(newUser)
            console.log(req.body, "7");
            
            return res.status(201).json(
                {
                    success: true,
                    message: "user is registered"
                }
            )
        
        } catch (error: any) {
        res.status(500).json(
            {
                success: false,
                message: "the user can't be registered",
                error: error.message
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
            id: user.id,
            id_role: user.idRole,
            nombre: user.nombre
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