// Purpose: Contains the structure of the Artwork entity.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Author } from './authors';
import { Museum } from './museums';
import { Image } from './images';
import { Floor } from './floors';

@Entity()
export class Artwork {
  @PrimaryGeneratedColumn()
    id: number | undefined;

  @Column({ type: 'varchar', nullable: true })
    name: string | undefined;

  @ManyToOne(() => Author)
    author: Author | undefined;

  @ManyToOne(() => Museum)
    museum: Museum | undefined;

  @ManyToOne(() => Image)
    main_image: Image | undefined;

  @ManyToOne(() => Image)
    thumbnail: Image | undefined;

  @Column({ type: 'double precision', nullable: true })
    width: number | undefined;

  @ManyToOne(() => Image)
    macroareas_image: Image | undefined;

  @Column({ type: 'timestamp', nullable: true })
    creation_date: Date | undefined;

  @Column({ type: 'timestamp', nullable: true })
    last_update: Date | undefined;

  @Column({ type: 'varchar', nullable: true })
    threedimensionalmodel: string | undefined;

  @Column({ type: 'boolean', nullable: true })
    published: boolean | undefined;

  @ManyToOne(() => Floor)
    floor: Floor | undefined;

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