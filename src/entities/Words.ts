import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Dictionaries from './Dictionaries';

@Entity()
export default class Words {
  constructor() {
    this.id = 0;
    // @ts-ignore
    this.dictionary = '';
    this.ru = '';
    this.en = '';
    this.en_count = 0;
    this.ru_count = 0;
    this.createDate = '';
    this.updateDate = '';
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ru: string;

  @Column()
  en: string;

  @Column()
  en_count: number;

  @Column()
  ru_count: number;

  @ManyToOne(type => Dictionaries, dictionary => dictionary)
  dictionary: Dictionaries;

  @CreateDateColumn()
  createDate: string;

  @UpdateDateColumn()
  updateDate: string;
}
