// Purpose: Contains the structure of the chapters table in the database, and the relationships between the chapters table and the other tables in the database.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Artwork } from './artworks';
import { Audio } from './audios';
import { Image } from './images';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
    id: number | undefined;

  @Column({ type: 'varchar', nullable: true })
    title: string | undefined;

  @Column({ type: 'varchar', nullable: true })
    text: string | undefined;

  @Column({ type: 'integer', nullable: true })
    number: number | undefined;

  @ManyToOne(() => Image)
    overlay_image: Image | undefined;

  @ManyToOne(() => Artwork)
    artwork: Artwork | undefined;

  @ManyToOne(() => Image)
    touch_area: Image | undefined;

  @ManyToOne(() => Audio)
    audio: Audio | undefined;

  @Column({ type: 'timestamp', nullable: true })
    creation_date: Date | undefined;

  @Column({ type: 'timestamp', nullable: true })
    last_update: Date | undefined;

  @Column({ type: 'boolean', nullable: true })
    published: boolean | undefined;

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