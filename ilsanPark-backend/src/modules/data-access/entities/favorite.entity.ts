import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'favorite' })
export class FavoriteEntity {
  @PrimaryGeneratedColumn({ name: 'user_email' })
  userEmail: string;

  @PrimaryGeneratedColumn({ name: 'board_number' })
  boardNumber: number;
}
