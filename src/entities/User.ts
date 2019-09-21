import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export default class User {
  constructor() {
    this.id = 0;
    this.name = '';
    this.surname = '';
    this.password = '';
    this.createDate = '';
    this.updateDate = '';
  }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createDate: string;

    @UpdateDateColumn()
    updateDate: string;
}
