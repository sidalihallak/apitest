import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";
@Entity()
export class Resume {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column('json', {nullable: true})
  data: any;

  @ApiProperty()
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @ManyToOne(() => User, user => user.resumes)
  user: User;
}
