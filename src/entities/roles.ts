// Purpose: Contains the entity for the roles table.
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    level: number | undefined;

    @Column({ type: 'varchar', nullable: true })
    description: string | undefined;
}