import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export default class Tokens {
  constructor() {
    this.id = 0;
    this.userId = 0;
    this.refresh = '';
    this.createDate = new Date();
    this.updateDate = new Date();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  refresh: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
