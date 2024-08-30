// Purpose: Defines the Audio entity for the database.
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Audio {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ type: 'varchar', nullable: true })
    base64: string | undefined;;

    @Column({ type: 'timestamp', nullable: true })
    creation_date: Date | undefined;;

    @Column({ type: 'timestamp', nullable: true })
    last_update: Date | undefined;

    @Column({ type: 'integer', nullable: true })
    version: number | undefined;;
}
