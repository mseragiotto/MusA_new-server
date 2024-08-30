// Purpose: Contains the structure of the Macroarea entity.
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Macroarea {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ type: 'varchar', nullable: true })
    title: string | undefined;

    @Column({ type: 'varchar', nullable: true })
    colour: string | undefined;

    @Column({ type: 'timestamp', nullable: true })
    creation_date: Date | undefined;

    @Column({ type: 'timestamp', nullable: true })
    last_update: Date | undefined;
}