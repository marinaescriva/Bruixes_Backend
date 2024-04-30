import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { Roles1714469789866 } from "./migrations/1714469789866-roles";
import { Usuarios1714469789867 } from "./migrations/1714469789867-usuarios";
import { Inventario1714469789868 } from "./migrations/1714469789868-inventario";
import { Juegos1714469789869 } from "./migrations/1714469789869-juegos";
import { ReservasJuegos1714469789870 } from "./migrations/1714469789870-reservas_juegos";
import { Mesas1714469789871 } from "./migrations/1714469789871-mesas";
import { ReservasMesas1714469789872 } from "./migrations/1714469789872-reservas_mesas";
import { Eventos1714475300399 } from "./migrations/1714475300399-eventos";
import { Reservas1814469789873 } from "./migrations/1814469789873-reservas";


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
        Inventario1714469789868,
        Juegos1714469789869,
        ReservasJuegos1714469789870,
        Mesas1714469789871,
        ReservasMesas1714469789872,
        Eventos1714475300399,
        Reservas1814469789873
    ],
    synchronize: false,
    logging: false,
});