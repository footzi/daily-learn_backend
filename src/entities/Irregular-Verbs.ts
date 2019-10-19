import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import UserIrregularVerbs from './User_Irregular-Verbs';

@Entity()
export default class IrregularVerbs {
  constructor() {
    this.id = 0;
    this.first = '';
    this.second = '';
    this.third = '';
    this.translate = '';
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first: string;

  @Column()
  second: string;

  @Column()
  third: string;

  @Column()
  translate: string;

  @OneToMany(type => UserIrregularVerbs, user_count => user_count.verb)
  // @ts-ignore
  user_count: UserIrregularVerbs[];
}
