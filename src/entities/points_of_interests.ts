// Purpose: Contains the structure of the PointsOfInterest entity.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Floor } from './floors';
import { PointsOfInterestCategories } from './points_of_interest_categories';

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

  // Hook executed before inserting the entity
  @BeforeInsert()
  setCreationDateAndVersion() {
    const now = new Date();
    this.creation_date = now;                   // Creation date initialized with the current date
    this.last_update = now;                     // Last update initialized with the current date
    this.version = 1;                           // Version initialized with 1 
  }

  // Hook executed before updating the entity
  @BeforeUpdate()
  updateTimestampAndVersion() {
    this.last_update = new Date();              // Update the last update with the current date
    this.version = (this.version || 0) + 1;     // Increment the version by 1
  }
}