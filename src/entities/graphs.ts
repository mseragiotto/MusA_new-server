// Purpose: Contains the structure of the Graph entity.
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class Graph {
  @PrimaryGeneratedColumn()
    id: number | undefined;

  @Column({ type: 'double precision', nullable: true })
    cell_size_meters: number | undefined;

  @Column({ type: 'double precision', nullable: true })
    cell_size_pixels: number | undefined;

  @Column({ type: 'integer', nullable: true })
    rows: number | undefined;

  @Column({ type: 'integer', nullable: true })
    columns: number | undefined;

  @Column({ type: 'double precision', nullable: true })
    wall_distance_meters: number | undefined;

  @Column({ type: 'integer', nullable: true })
    cell_offset: number | undefined;

  @Column({ type: 'jsonb', nullable: true })
    nodes: string | undefined;

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