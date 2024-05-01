import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Juego } from "./Juego";

@Entity('inventario')
export class Inventario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'nombre', type: 'varchar', length: 50 })
    nombre!: string;

    @Column({ name: 'cantidad', type: 'int' })
    cantidad!: number;

    @Column({ name: 'jugadores', type: 'int' })
    jugadores!: number;

    @ManyToOne(() => Juego, juego => juego.inventario) 
    juego!: Juego;
}
