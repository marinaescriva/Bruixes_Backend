import { Request, Response } from "express";
import { Role } from "../models/Role";
// import { Role } from "../models/Role";
// import { title } from "process";

export const getRoles= (req: Request,res: Response)=>{


    res.status(200).json (
        {
         succes: true,
         message: "roles retrieved seccesfully",
        }
    );
};

export const createRole= async(req:Request, res:Response)=>{
    try {
        const nombre = req.body.nombre;
        console.log(nombre);
        if (nombre.length > 50) {
            return res.status(400).json({
                success: false,
                message: "Role name must be under 50 characters"
          }
            ) }
            const newRole = await Role.create({
                nombre: nombre
            }).save()
            
        res.status(201).json({
            success: true,
            message: "Role created",
            data: newRole
        })
    } catch (error) {
        res.status(500).json({
        success:false,
        message:"can't create rol",
        error:error
        })
    }
    };

export const deleteRole=(req:Request, res:Response)=>{
    try {
        const id_user = parseInt(req.params.id);

        // Role.delete(
        //     { id: id_user }
        // )

        res.status(200).json({
            "success": true,
            "message": "Role deleted successfuly"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Role cant be deleted",
            error: error
        })
    }
};