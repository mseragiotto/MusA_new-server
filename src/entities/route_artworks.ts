// Purpose: Contains the structure of the RouteArtwork entity.
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Route } from './routes';
import { Artwork } from './artworks';

@Entity()
export class RouteArtwork {
  @PrimaryColumn()
    route_id: number | undefined;

  @PrimaryColumn()
    work_id: number | undefined;

  @ManyToOne(() => Route, route => route.id)
  @JoinColumn({ name: 'route_id' })
    route: Route | undefined;

  @ManyToOne(() => Artwork, artwork => artwork.id)
  @JoinColumn({ name: 'work_id' })
    artwork: Artwork | undefined;

  @Column({ type: 'integer', nullable: true })
    order: number | undefined;
}