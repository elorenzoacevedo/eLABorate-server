import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Lab } from './Lab';
import { Deletion } from './Deletion';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  content!: string;

  @Column('timestamptz')
  datePosted!: Date;

  @ManyToOne(() => User)
  author!: User;

  @ManyToOne(() => Lab)
  lab!: Lab;

  @OneToOne(() => Deletion, (deletion) => deletion.post)
  @JoinColumn()
  deletion!: Deletion;
}
