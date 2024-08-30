// Purpose: Contains the structure of the Route entity.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Museum } from "./museums";

@Entity()
export class Route {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ type: 'varchar', nullable: true })
    name: string | undefined;

    @Column({ type: 'varchar', nullable: true })
    description: string | undefined;

    @ManyToOne(() => Museum)
    museum: Museum | undefined;

    @Column({ type: 'timestamp', nullable: true })
    creation_date: Date | undefined;

    @Column({ type: 'timestamp', nullable: true })
    last_update: Date | undefined;
}