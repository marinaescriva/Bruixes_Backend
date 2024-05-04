import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne, OneToMany } from "typeorm";
import { Reserva } from "./Reserva";
import { Mesa } from "./Mesa";

@Entity('reservas_mesas')
export class ReservaMesa extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    // @Column({ name: 'id_reserva', type: 'int' })
    // idReserva!: number;

    @Column({ name: 'id_mesa', type: 'int' })
    idMesa!: number;

    @OneToMany(() => Reserva, (reserva) => reserva.idReservaMesa) 
    reserva!: Reserva;

    @ManyToOne(() => Mesa, (mesa) => mesa.reservasMesa) 
    mesa!: Mesa;
    
}
