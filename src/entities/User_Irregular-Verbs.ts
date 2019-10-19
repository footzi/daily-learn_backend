import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
import IrregularVerbs from './Irregular-Verbs';

@Entity()
export default class UserIrregularVerbs {
  constructor() {
    this.id = 0;
    this.userId = 0;
    this.count_first = 0;
    this.count_second = 0;
    this.count_third = 0;
    this.count_translate = 0;
    // @ts-ignore
    this.verb = '';
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  count_first: number;

  @Column()
  count_second: number;

  @Column()
  count_third: number;

  @Column()
  count_translate: number;

  @ManyToOne(type => IrregularVerbs, verb => verb)
  verb: IrregularVerbs;
}
