import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}

