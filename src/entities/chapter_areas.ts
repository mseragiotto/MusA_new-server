// Purpose: Contains the structure of the chapter_areas table in the database.
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Chapter } from './chapters';
import { Macroarea } from './macroareas';

@Entity()
export class ChapterArea {
  @PrimaryGeneratedColumn()
    id: number | undefined;

  @ManyToOne(() => Chapter)
    chapter: Chapter | undefined;

  @ManyToOne(() => Macroarea)
    macroarea: Macroarea | undefined;
}