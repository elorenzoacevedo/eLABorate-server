import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from './User';
import { Post } from './Post';

@Entity()
export class Lab extends BaseEntity {
  @PrimaryColumn('varchar', { length: 75 })
  name!: string;

  @Column('timestamptz')
  startDate!: Date;

  @Column('timestamptz')
  endDate!: Date;

  @Column('varchar', { length: 75 })
  course!: string;

  @OneToMany(() => User, (user) => user.lab)
  users!: User[];

  @OneToMany(() => Post, (post) => post.lab)
  posts!: Post[];
}
