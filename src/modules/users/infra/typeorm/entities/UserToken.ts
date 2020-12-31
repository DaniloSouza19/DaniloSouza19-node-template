import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_tokens')
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column()
  @Generated('uuid')
  private token: string;

  @Column()
  private user_id: string;

  @CreateDateColumn()
  private created_at: Date;

  @UpdateDateColumn()
  private updated_at: Date;
}

export default UserToken;
