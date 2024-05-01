import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('eventos')
export class Evento extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'nombre', type: 'varchar', length: 50 })
    nombre!: string;

    @Column({ name: 'players', type: 'int' })
    players!: number;

    @Column({ name: 'fecha', type: 'date' })
    fecha!: Date;

    @Column({ name: 'info', type: 'varchar', length: 50 })
    info!: string;
}

