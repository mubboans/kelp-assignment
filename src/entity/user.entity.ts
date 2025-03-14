import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string; 

    @Column({ type: 'int4', nullable: false })
    age: number;

    @Column({ type: 'jsonb', nullable: true })
    address: any;

    @Column({ type: 'jsonb', nullable: true })
    additional_info: any; 
}