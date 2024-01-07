import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BoardEntity } from './board.entity';

@Entity({ name: 'image' })
export class ImageEntity {
  @PrimaryGeneratedColumn({ name: 'sequence' })
  sequence: number;

  @Column({ name: 'image' })
  image: string;

  @Column({ name: 'board_number' })
  boardNumber: number;
}
