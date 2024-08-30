// Purpose: Contains the structure of the ArlFloor entity.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import { Museum } from "./museums";
import { Floor } from "./floors";

@Entity()
export class ArlFloor {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ type: 'varchar', nullable: true })
    name: string | undefined;

    @OneToOne(() => Floor)
    floor: Floor | undefined;

    @ManyToOne(() => Museum)
    museum: Museum | undefined;

    @Column({ type: 'timestamp', nullable: true })
    creation_date: Date | undefined;

    @Column({ type: 'timestamp', nullable: true })
    last_update: Date | undefined;

    @Column({ type: 'integer', nullable: true })
    version: number | undefined;
}