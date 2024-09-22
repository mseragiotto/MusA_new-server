// Purpose: Contains the User entity and its properties.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import bcrypt from 'bcryptjs';
import { Role } from "./roles";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ type: 'varchar', nullable: true })
  username: string | undefined;

  @Column({ type: 'varchar', nullable: true })
  password: string | undefined;

  @ManyToOne(() => Role )
  role: Role | undefined;

  // Method to set (and crypt) the password
  async setPassword(rawPassword: string) {
    this.password = await bcrypt.hash(rawPassword, 10);
  }

  // Method to check the password
  async checkPassword(rawPassword: string): Promise<boolean> {
    if (this.password === undefined) {
      return false;
    }
    return await bcrypt.compare(rawPassword, this.password);
  }
}