import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string; // firstName + lastName

    @Column({ type: 'int', nullable: false })
    age: number;

    @Column({ type: 'jsonb', nullable: true })
    address: object;

    @Column({ type: 'jsonb', nullable: true })
    additional_info: object;
}
