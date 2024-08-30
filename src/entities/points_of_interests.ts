/*
CREATE TABLE "points_of_interest" (
  "id" integer PRIMARY KEY,
  "name" character varying,
  "floor" integer,
  "x_meters" double precision,
  "y_meters" double precision,
  "x_pixels" double precision,
  "y_pixels" double precision,
  "latitude" double precision,
  "longitude" double precision,
  "category" integer,
  "published" boolean,
  "creation_date"  timestamp without time zone,
  "last_update"  timestamp without time zone,
  "version" integer
);
*/
// Purpose: Contains the structure of the PointsOfInterest entity.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Floor } from "./floors";
import { PointsOfInterestCategories } from "./points_of_interest_categories";

@Entity()
export class PointsOfInterest {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ type: 'varchar', nullable: true })
    name: string | undefined;

    @ManyToOne(() => Floor)
    floor: Floor | undefined;

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

    @ManyToOne(() => PointsOfInterestCategories)
    category: PointsOfInterestCategories | undefined;

    @Column({ type: 'boolean', nullable: true })
    published: boolean | undefined;

    @Column({ type: 'timestamp', nullable: true })
    creation_date: Date | undefined;

    @Column({ type: 'timestamp', nullable: true })
    last_update: Date | undefined;

    @Column({ type: 'integer', nullable: true })
    version: number | undefined;
}