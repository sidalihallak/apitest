import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity
} from "typeorm";
import { Resume } from "../../resume/entities/resume.entity";

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column("simple-array")
  roles: string[]

  @Column()
  password?: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @OneToMany(() => Resume, resume => resume.user)
  resumes?: Resume[];
}
