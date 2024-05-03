import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Juego } from "./Juego";
import { Reserva } from "./Reserva";

@Entity('reservas_juegos')
export class ReservaJuego extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: bigint;

    @Column({ name: 'id_reserva', type: 'int' })
    idReserva!: bigint;

    @Column({ name: 'id_juego', type: 'int' })
    idJuego!: bigint;

    @ManyToOne(() => Reserva, (reserva)=> reserva.idReservaJuego) 
    reserva!: Reserva;

    @ManyToOne(() => Juego, (juego) => juego.reservasJuego) 
    juego!: Juego;
}
