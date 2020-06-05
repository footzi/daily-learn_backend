import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export default class User {
  constructor() {
    this.id = 0;
    this.login = '';
    this.email = '';
    this.password = '';
    this.paws = 0;
    this.createDate = new Date();
    this.updateDate = new Date();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  paws: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
