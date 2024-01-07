import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'favorite' })
export class FavoriteEntity {
  @PrimaryColumn({ name: 'user_email' })
  userEmail: string;

  @PrimaryColumn({ name: 'board_number' })
  boardNumber: number;
}
