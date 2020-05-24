import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, Timestamp } from 'typeorm';

@Entity()
export default class User {
  constructor() {
    this.id = 0;
    this.login = '';
    this.email = '';
    this.password = '';
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

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
