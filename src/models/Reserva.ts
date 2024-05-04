import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Evento } from "./Evento";
import { Mesa } from "./Mesa";
import { Juego } from "./Juego";
import { join } from "path";

@Entity('reservas')
export class Reserva extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_usuario', type: 'int' })
    idUsuario!: number;

    @Column({ name: 'id_mesa', type: 'int' })
    idMesa!: number;

    @Column({ name: 'id_juego', type: 'int', nullable: true })
    idJuego?: number;

    @Column({ name: 'id_evento', type: 'int', nullable: true })
    idEvento?: number;

    @Column({ name: 'fecha_hora_inicio', type: 'datetime' })
    fechaHoraInicio!: Date;

    @Column({ name: 'fecha_hora_fin', type: 'datetime' })
    fechaHoraFin!: Date;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @ManyToOne(() => User, user => user.reservas)
    @JoinColumn({name: "id_usuario"})
    user!: User;

    @ManyToOne(() => Mesa, mesa => mesa.reservas) 
    @JoinColumn({name: "id_mesa"})
    mesa!: Mesa;

    @ManyToOne(() => Juego, juego => juego.reservas)
    @JoinColumn({name: "id_juego"})
    juego!: Juego;

    @ManyToOne(() => Evento, evento => evento.reservas)
    @JoinColumn({name: "id_evento"})
    evento!: Evento;
  
}

