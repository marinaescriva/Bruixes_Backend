import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reserva } from "./Reserva";
@Entity('eventos')
export class Evento extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: bigint;

    @Column({ name: 'nombre', type: 'varchar', length: 50 })
    nombre!: string;

    @Column({ name: 'players', type: 'int' })
    players!: bigint;

    @Column({ name: 'fecha', type: 'date' })
    fecha!: Date;

    @Column({ name: 'info', type: 'varchar', length: 50 })
    info!: string;

    @OneToMany(() => Reserva, (reserva) => reserva.evento)
    reservas!: Reserva[];
}

