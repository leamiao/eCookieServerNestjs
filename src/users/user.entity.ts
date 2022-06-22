import { BaseAuditEntity } from '../common/baseAudit.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "users"})
export class User extends BaseAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
