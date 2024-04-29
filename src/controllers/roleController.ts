import { Request, Response } from "express";

export const getRoles = (req: Request, res: Response) => {
    res.status(200).json(
        {
            success: true,
            message: "roles retrieved successfuly"
        }
    )
};

export const createRole = (req: Request, res: Response) => {

    const name = req.body.nombre

    console.log(name);

    res.status(201).json(
        {
            success: true,
            message: "role created successfuly"
        }
    )
};

export const updateRole = (req: Request, res: Response) => {

    req.params.id
    res.status(200).json(
        {
            success: true,
            message: "role updated successfuly"
        }
    )
};

export const deleteRole = (req: Request, res: Response) => {
    res.status(200).json(
        {
            success: true,
            message: "role deleted successfuly"
        }
    )
}