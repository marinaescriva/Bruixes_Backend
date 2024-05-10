import { Entity , BaseEntity , Column, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Reserva } from "./Reserva";


@Entity('mesas')
export class Mesa extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'capacidad', type: 'int' })
    capacidad!: Number;

    @Column({ name: 'is_available', type: 'boolean', default: true })
    isAvailable!: boolean;

    @OneToMany(() => Reserva, (reserva) => reserva.mesa) 
    reservas!: Reserva[];

}