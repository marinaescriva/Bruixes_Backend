import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Juego } from "./Juego";
import { Reserva } from "./Reserva";

@Entity('reservas_juegos')
export class ReservaJuego extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_reserva', type: 'int' })
    idReserva!: number;

    @Column({ name: 'id_juego', type: 'int' })
    idJuego!: number;

    @ManyToOne(() => Reserva, (reserva)=> reserva.idReservaJuego) 
    reserva!: Reserva;

    @ManyToOne(() => Juego, (juego) => juego.reservasJuego) 
    juego!: Juego;
}
