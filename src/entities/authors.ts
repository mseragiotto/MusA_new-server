// Purpose: Contains the Author entity and its properties.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Image } from "./images";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ type: 'varchar', nullable: true })
  name: string | undefined;

  @Column({ type: 'varchar', nullable: true })
  bio: string | undefined;

  @ManyToOne(() => Image)
  image: Image | undefined;

  @Column({ type: 'timestamp', nullable: true })
  creation_date: Date | undefined;

  @Column({ type: 'timestamp', nullable: true })
  last_update: Date | undefined;

  @Column({ type: 'boolean', nullable: true })
  published: boolean | undefined;

  @Column({ type: 'integer', nullable: true })
  version: number | undefined;
}