import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReservaJuego } from "./ReservaJuego";
import { Inventario } from "./Inventario";
@Entity('juegos')
export class Juego extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'nombre', type: 'varchar', length: 50 })
    nombre!: string;

    @Column({ name: 'jugadores', type: 'int' })
    jugadores!: number;

    @Column({ name: 'is_available', type: 'boolean', default: true })
    isAvailable!: boolean;

    @OneToMany(() => ReservaJuego, reservaJuego => reservaJuego.juego) 
    reservasJuego!: ReservaJuego[];

    @OneToMany(() => Inventario, inventario => inventario.juego) 
    inventario!: Inventario[];
}

