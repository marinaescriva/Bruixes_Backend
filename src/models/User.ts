import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reserva } from "./Reserva";
@Entity('usuarios')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'nombre', type: 'varchar', length: 50 })
    nombre!: string;

    @Column({ name: 'email', type: 'varchar', length: 50, unique: true })
    email!: string;

    @Column({ name: 'password', type: 'varchar', length: 255 })
    password!: string;

    @Column({ name: 'id_role', type: 'int', default: 2 })
    idRole!: number;

    @Column({ name: 'is_active', type: 'boolean', default: true })
    isActive!: boolean;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    @OneToMany(() => Reserva, reserva => reserva.user) 
    reservas!: Reserva[];
}
