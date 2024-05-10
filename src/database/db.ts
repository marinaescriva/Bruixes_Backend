import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { Roles1714469789866 } from "./migrations/1714469789866-roles";
import { Usuarios1714469789867 } from "./migrations/1714469789867-usuarios";
import { Juegos1714469789868 } from "./migrations/1714469789868-juegos";
import { Mesas1714469789871 } from "./migrations/1714469789871-mesas";
import { Eventos1714475300399 } from "./migrations/1714475300399-eventos";
import { Reservas2014469789870 } from "./migrations/2014469789870-reservas";

import { Role } from "../models/Role";
import { User } from "../models/User";
import { Juego } from "../models/Juego";
import { Mesa } from "../models/Mesa";
import { Evento } from "../models/Evento";
import { Reserva } from "../models/Reserva";



export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3307,
    username: process.env.DB_USER || "root",
    password: process.env.DB_ROOT_PASSWORD || "1234",
    database: process.env.DB_DATABASE || "test",
    entities: [Role, User, Juego, Mesa, Evento, Reserva],
    migrations: [
        Roles1714469789866,
        Usuarios1714469789867,
        Juegos1714469789868,
        Mesas1714469789871,
        Eventos1714475300399,
        Reservas2014469789870,
    

    ],
    synchronize: false,
    logging: false,
});