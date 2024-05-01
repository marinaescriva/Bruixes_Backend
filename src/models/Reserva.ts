import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('reservas')
export class Reserva extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_usuario', type: 'int' })
    idUsuario!: number;

    @Column({ name: 'id_reserva_mesa', type: 'int' })
    idReservaMesa!: number;

    @Column({ name: 'id_reserva_juego', type: 'int', nullable: true })
    idReservaJuego?: number;

    @Column({ name: 'id_evento', type: 'int', nullable: true })
    idEvento?: number;

    @Column({ name: 'fecha_hora_inicio', type: 'datetime' })
    fechaHoraInicio!: Date;

    @Column({ name: 'fecha_hora_fin', type: 'datetime' })
    fechaHoraFin!: Date;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @ManyToOne(() => User, user => user.reservas)
    user!: User;
}

