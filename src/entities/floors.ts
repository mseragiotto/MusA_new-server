// Purpose: Contains the structure of the floors table in the database, and the relationships between the floors table and the other tables in the database.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Museum } from './museums';
import { Image } from './images';
import { Graph } from './graphs';
import { ArlFloor } from './arl_floors';

@Entity()
export class Floor {
  @PrimaryGeneratedColumn()
    id: number | undefined;

  @Column({ type: 'varchar', nullable: true })
    name: string | undefined;

  @ManyToOne(() => Museum)
    museum: Museum | undefined;

  @Column({ type: 'integer', nullable: true })
    floor_order: number | undefined;

  @Column({ type: 'double precision', nullable: true })
    latitude: number | undefined;

  @Column({ type: 'double precision', nullable: true })
    longitude: number | undefined;

  @Column({ type: 'double precision', nullable: true })
    rotation: number | undefined;

  @Column({ type: 'double precision', nullable: true })
    width: number | undefined;

  @Column({ type: 'double precision', nullable: true })
    height: number | undefined;

  @Column({ type: 'boolean', nullable: true })
    main_floor: boolean | undefined;

  @ManyToOne(() => Image)
    image: Image | undefined;

  @OneToOne(() => Graph)
    graph: Graph | undefined;

  @Column({ type: 'boolean', nullable: true })
    published: boolean | undefined;

  @OneToOne(() => ArlFloor)
    arl_floor: ArlFloor | undefined;

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