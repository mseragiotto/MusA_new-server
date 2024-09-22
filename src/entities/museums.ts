// Purpose: Contains the entity for the museums table.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Image } from './images';

@Entity()
export class Museum {
  @PrimaryGeneratedColumn()
    id: number | undefined;

  @Column({ type: 'varchar', nullable: true })
    name: string | undefined;

  @Column({ type: 'double precision', nullable: true })
    latitude: number | undefined;

  @Column({ type: 'double precision', nullable: true })
    longitude: number | undefined;

  @Column({ type: 'varchar', nullable: true })
    address: string | undefined;

  @Column({ type: 'varchar', nullable: true })
    website: string | undefined;

  @Column({ type: 'boolean', nullable: true })
    geolocked: boolean | undefined;

  @ManyToOne(() => Image)
    ar_icon: Image | undefined;

  @ManyToOne(() => Image)
    logo: Image | undefined;

  @ManyToOne(() => Image)
    backgroundimage: Image | undefined;

  @Column({ type: 'timestamp', nullable: true })
    creation_date: Date | undefined;

  @Column({ type: 'timestamp', nullable: true })
    last_update: Date | undefined;

  @Column({ type: 'boolean', nullable: true })
    published: boolean | undefined;

  @Column({ type: 'varchar', nullable: true })
    arl_file: string | undefined;

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