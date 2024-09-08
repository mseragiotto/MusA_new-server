// Purpose: Defines the Image entity for the database.
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ type: 'varchar'})
  base64: string | undefined;
}