import { Entity , BaseEntity , Column, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { ReservaMesa } from "./ReservaMesa";


@Entity('mesas')
export class Mesa extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'capacidad', type: 'int' })
    capacidad!: bigint;

    @Column({ name: 'is_available', type: 'boolean', default: true })
    isAvailable!: boolean;

    @OneToMany(() => ReservaMesa, reservaMesa => reservaMesa.mesa) 
    reservasMesa!: ReservaMesa[];

}