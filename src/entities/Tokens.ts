import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export default class Tokens {
  constructor() {
    this.id = 0;
    this.userId = 0;
    this.refresh = '';
  }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    refresh: string;
}
