import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Dictionaries from './Dictionaries';

@Entity()
export default class Words {
  constructor() {
    this.id = 0;
    // @ts-ignore
    this.dictionary = '';
    this.groupId = 0;
    this.name = '';
    this.translate = '';
    this.nameCount = 0;
    this.translateCount = 0;
    this.createDate = '';
    this.updateDate = '';
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupId: number;

  @Column()
  name: string;

  @Column()
  translate: string;

  @Column()
  nameCount: number;

  @Column()
  translateCount: number;

  @ManyToOne(type => Dictionaries, dictionary => dictionary, { onDelete: 'CASCADE' })
  dictionary: Dictionaries;

  @CreateDateColumn()
  createDate: string;

  @UpdateDateColumn()
  updateDate: string;
}
