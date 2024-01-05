import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from "typeorm";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    username: string;
    
    @Column()
    email: string;

    @Column()
    password : string;
    
    @BeforeInsert()
    emaiToLowerCase() {
        this.email = this.email.toLowerCase();
    }

}