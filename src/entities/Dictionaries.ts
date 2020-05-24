import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import Words from './Words';

@Entity()
export default class Dictionaries {
  constructor() {
    this.id = 0;
    this.userId = 0;
    this.name = '';
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  name: string;

  @OneToMany(() => Words, (words) => words.dictionary, { onDelete: 'CASCADE' })
  // @ts-ignore
  words: Words[];
}
