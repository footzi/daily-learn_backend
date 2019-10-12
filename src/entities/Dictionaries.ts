import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import Words from './Words';

@Entity()
export default class Dictionaries {
  constructor() {
    this.id = 0;
    this.userId = 0;
    this.name = '';
    this.createDate = '';
    this.updateDate = '';
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  name: string;

  @OneToMany(type => Words, words => words.dictionary)
  // @ts-ignore
  words: Words[];

  @CreateDateColumn()
  createDate: string;

  @UpdateDateColumn()
  updateDate: string;
}
