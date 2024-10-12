// Purpose: Contains the structure of the ArlArtwork entity.
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BeforeUpdate, BeforeInsert } from 'typeorm';
import { Artwork } from './artworks';
import { ArlFloor } from './arl_floors';

@Entity()
export class ArlArtwork {
  @PrimaryColumn()
    artworkId: number | undefined; 

  @PrimaryColumn()
    arl_floorId: number | undefined; 

  @ManyToOne(() => Artwork, artwork => artwork.id)
  @JoinColumn({ name: 'artworkId' }) 
    artwork: Artwork | undefined;

  @ManyToOne(() => ArlFloor, arl_floor => arl_floor.id)
  @JoinColumn({ name: 'arl_floorId' }) 
    arl_floor: ArlFloor | undefined;

  @Column({ type: 'double precision', nullable: true })
    latitude: number | undefined;

  @Column({ type: 'double precision', nullable: true })
    longitude: number | undefined;

  @Column({ type: 'double precision', nullable: true })
    height: number | undefined;

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