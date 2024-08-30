// Purpose: Contains the structure of the ConnectionGroup entity.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Museum } from "./museums";

@Entity()
export class ConnectionGroup {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ type: 'varchar', nullable: true })
    name: string | undefined;

    @Column({ type: 'varchar', nullable: true })
    type: string | undefined;

    @ManyToOne(() => Museum)
    museum: Museum | undefined;
}