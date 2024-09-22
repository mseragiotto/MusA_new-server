// Purpose: Contains the structure of the chapter_areas table in the database.
import { Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Chapter } from './chapters';
import { Macroarea } from './macroareas';

@Entity()
export class ChapterArea {
  @PrimaryGeneratedColumn()
    id: number | undefined;

  @ManyToMany(() => Chapter)
    chapter: Chapter | undefined;

  @ManyToOne(() => Macroarea)
    macroarea: Macroarea | undefined;
}