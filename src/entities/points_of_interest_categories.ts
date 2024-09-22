// Purpose: Contains the structure of the PointsOfInterestCategories entity.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Museum } from './museums';
import { Image } from './images';

@Entity()
export class PointsOfInterestCategories {
  @PrimaryGeneratedColumn()
    id: number | undefined;

  @Column({ type: 'varchar', nullable: true })
    name: string | undefined;

  @ManyToOne(() => Museum)
    museum: Museum | undefined;

  @Column({ type: 'double precision', nullable: true })
    width_pixels: number | undefined;

  @Column({ type: 'double precision', nullable: true })
    height_pixels: number | undefined;

  @Column({ type: 'varchar', nullable: true })
    colour: string | undefined;

  @ManyToOne(() => Image)
    image: Image | undefined;
}