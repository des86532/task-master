import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SubTask } from './sub-task.entity';
import { User } from '../auth/user.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  priority: number;

  @OneToMany(() => SubTask, (subTask) => subTask.task, { cascade: true })
  subTasks: SubTask[];

  @Column({
    type: 'int',
    nullable: true,
    default: null,
  })
  created_by_id: number;

  @Column({
    type: 'int',
    nullable: true,
    default: null,
  })
  updated_by_id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'created_by_id' })
  created_by: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'updated_by_id' })
  updated_by: User;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  expired_at: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: string;
}
