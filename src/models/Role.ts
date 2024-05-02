import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User";
@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: bigint

    @Column({name:'nombre'})
    nombre!: string

    @OneToMany(() => User, user => user.idRole)
    users!: User[];

}
