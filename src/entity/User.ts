import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Lab } from './Lab';
import { Post } from './Post';
import { Deletion } from './Deletion';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn('char', { length: 9 })
  pantherId!: string;

  @Column('varchar', { length: 30 })
  username!: string;

  @Column('varchar')
  password!: string;

  @Column('varchar', { length: 50 })
  firstName!: string;

  @Column('varchar', { length: 50 })
  lastName!: string;

  @Column('varchar', { length: 100 })
  email!: string;

  @Column('varchar', { length: 20 })
  role!: string;

  @ManyToOne(() => Lab, (lab) => lab.users)
  lab!: Lab;

  @OneToMany(() => Post, (post) => post.author)
  posts!: Post[]

  @OneToMany(() => Deletion, (deletion) => deletion.moderator)
  deletions!: Deletion[]
}
