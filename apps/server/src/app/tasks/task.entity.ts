import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TaskType } from '@task-master/shared/types'; // 导入 TaskType

@Entity('tasks')
export class Task implements TaskType {
  // 使 Task 实体实现 TaskType
  @PrimaryGeneratedColumn()
  id: TaskType['id']; // 使用 TaskType 的类型

  @Column()
  title: TaskType['title']; // 使用 TaskType 的类型

  @Column()
  description: TaskType['description']; // 使用 TaskType 的类型

  @Column()
  status: TaskType['status']; // 使用 TaskType 的类型

  @Column()
  priority: TaskType['priority']; // 使用 TaskType 的类型

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  expired_at: TaskType['expired_at']; // 使用 TaskType 的类型
  // 修改 expired_at 以允许传入，但不是必需的

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    insert: false,
  })
  created_at: TaskType['created_at']; // 使用 TaskType 的类型
  // created_at 不可传，自动生成当前时间

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    insert: false,
  })
  updated_at: TaskType['updated_at']; // 使用 TaskType 的类型
  // updated_at 不可传，更新时自动记录当前时间
}
