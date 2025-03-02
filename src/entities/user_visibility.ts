import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class UserVisibility {
  @PrimaryGeneratedColumn()
    id: number | undefined;

  @Column({ type: 'integer', nullable: true })
    userId: number | undefined;

  @Column({ type: 'integer', nullable: true })
    museumId: number | undefined;

  @Column({ type: 'timestamp', nullable: true })
    creation_date: Date | undefined;

  @Column({ type: 'timestamp', nullable: true })
    last_update: Date | undefined;

  @Column({ type: 'integer', nullable: true })
    version: number | undefined;

  @BeforeInsert()
  setCreationDateAndVersion() {
    const now = new Date();
    this.creation_date = now;
    this.last_update = now;
    this.version = 1;
  }

  @BeforeUpdate()
  updateTimestampAndVersion() {
    this.last_update = new Date();
    this.version = (this.version || 0) + 1;
  }
}