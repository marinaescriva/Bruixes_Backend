import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { Roles1714469789867 } from "./migrations/1714469789867-roles";
import { Juegos1714469789868 } from "./migrations/1714472191614-juegos";
import { ReservasJuegos1714469789869 } from "./migrations/1714472629419-reservas_juegos";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3307,
    username: process.env.DB_USER || "root",
    password: process.env.DB_ROOT_PASSWORD || "1234",
    database: process.env.DB_DATABASE || "test",
    entities: [],
    migrations: [Roles1714469789867, Juegos1714469789868, ReservasJuegos1714469789869],
    synchronize: false,
    logging: false,
});