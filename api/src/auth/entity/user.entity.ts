import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uid: string;

    @Column()
    email: string;

    @Column()
    upw: string;

    @Column()
    admin: boolean;
}