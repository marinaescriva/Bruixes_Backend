import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reserva } from "./Reserva";
@Entity('juegos')
export class Juego extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'nombre', type: 'varchar', length: 50 })
    nombre!: string;

    @Column({ name: 'jugadores', type: 'int' })
    jugadores!: number;

    // @Column ({ name: 'inventario', type: 'int' })
    // inventario!: number;

    @Column({ name: 'is_available', type: 'boolean', default: true })
    isAvailable!: boolean;

    @OneToMany(() => Reserva, (reserva) => reserva.juego) 
    reservas!: Reserva[];

}

