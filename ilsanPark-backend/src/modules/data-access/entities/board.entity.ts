import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'board' })
export class BoardEntity {
  @PrimaryGeneratedColumn({ name: 'board_number' })
  boardNumber: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'write_datetime' })
  writeDatetime: string;

  @Column({ name: 'favorite_count' })
  favoriteCount: number;

  @Column({ name: 'commnet_count' })
  commentCount: number;

  @Column({ name: 'view_count' })
  viewCount: number;

  @Column({ name: 'writer_email' })
  writerEmail: string;
}
