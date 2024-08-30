// Purpose: Contains the User entity and its properties.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Role } from "./roles";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ type: 'varchar', nullable: true })
  username: string | undefined;

  @Column({ type: 'varchar', nullable: true })
  password: string | undefined;

  @ManyToOne(() => Role)
  role: Role | undefined;
}