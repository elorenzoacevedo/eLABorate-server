import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Post } from './Post';

@Entity()
export class Deletion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  reason!: string;

  @Column('timestamptz')
  deletionDate!: Date;

  @ManyToOne(() => User)
  moderator!: User;

  @OneToOne(() => Post, (post) => post.deletion)
  post!: Post;
}
