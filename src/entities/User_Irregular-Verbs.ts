import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
import IrregularVerbs from './Irregular-Verbs';

@Entity()
export default class UserIrregularVerbs {
  constructor() {
    this.id = 0;
    this.userId = 0;
    this.first_count = 0;
    this.second_count = 0;
    this.third_count = 0;
    this.translate_count = 0;
    // @ts-ignore
    this.verb = '';
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  first_count: number;

  @Column()
  second_count: number;

  @Column()
  third_count: number;

  @Column()
  translate_count: number;

  @ManyToOne(type => IrregularVerbs, verb => verb)
  verb: IrregularVerbs;
}
