import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { Roles1714469789866 } from "./migrations/1714469789866-roles";
import { Usuarios1714469789867 } from "./migrations/1714469789867-usuarios";
import { Juegos1714469789868 } from "./migrations/1714469789868-juegos";
import { Mesas1714469789871 } from "./migrations/1714469789871-mesas";
import { Eventos1714475300399 } from "./migrations/1714475300399-eventos";
import { Reservas2014469789870 } from "./migrations/2014469789870-reservas";
import { ReservasMesas1814469789872 } from "./migrations/1814469789872-reservas_mesas";
import { ReservasJuegos1914469789870 } from "./migrations/1914469789870-reservas_juegos";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3307,
    username: process.env.DB_USER || "root",
    password: process.env.DB_ROOT_PASSWORD || "1234",
    database: process.env.DB_DATABASE || "test",
    entities: [],
    migrations: [
        Roles1714469789866,
        Usuarios1714469789867,
        Juegos1714469789868,
        Mesas1714469789871,
        Eventos1714475300399,
        Reservas2014469789870,
        ReservasMesas1814469789872,
        ReservasJuegos1914469789870

    ],
    synchronize: false,
    logging: false,
});