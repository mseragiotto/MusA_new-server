// Purpose: Contains the structure of the ArlArtwork entity.
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Artwork } from "./artworks";
import { ArlFloor } from "./arl_floors";

@Entity()
export class ArlArtwork {
    @PrimaryColumn()
    artwork: number | undefined;

    @PrimaryColumn()
    arl_floor: number | undefined;

    @ManyToOne(() => Artwork, artwork => artwork.id)
    @JoinColumn({ name: 'artwork' })
    artwork_id: Artwork | undefined;

    @ManyToOne(() => ArlFloor, arl_floor => arl_floor.id)
    @JoinColumn({ name: 'arl_floor' })
    arl_floor_id: ArlFloor | undefined;

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
}