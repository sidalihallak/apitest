import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
@Entity()
export class Resume {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('simple-json', {nullable: true})
  data: any;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @ManyToOne(() => User, user => user.resumes)
  user: User;
}
