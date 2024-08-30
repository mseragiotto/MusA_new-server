// Purpose: Contains the structure of the FloorsConnection entity.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Floor } from "./floors";
import { ConnectionGroup } from "./connection_groups";

@Entity()
export class FloorsConnection {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @ManyToOne(() => ConnectionGroup)
    connection_group: ConnectionGroup | undefined;

    @ManyToOne(() => Floor)
    source_floor: Floor | undefined;

    @ManyToOne(() => Floor)
    target_floor: Floor | undefined;

    @Column({ type: 'double precision', nullable: true })
    x_meters: number | undefined;

    @Column({ type: 'double precision', nullable: true })
    y_meters: number | undefined;

    @Column({ type: 'double precision', nullable: true })
    x_pixels: number | undefined;

    @Column({ type: 'double precision', nullable: true })
    y_pixels: number | undefined;

    @Column({ type: 'double precision', nullable: true })
    latitude: number | undefined;

    @Column({ type: 'double precision', nullable: true })
    longitude: number | undefined;

    @Column({ type: 'timestamp', nullable: true })
    creation_date: Date | undefined;

    @Column({ type: 'timestamp', nullable: true })
    last_update: Date | undefined;
}