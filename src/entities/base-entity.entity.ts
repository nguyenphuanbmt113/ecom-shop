import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
} from 'typeorm';

@Entity()
class BaseClassEntity extends BaseEntity {
  @CreateDateColumn({
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP(6)',
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  createdat: Date;

  @CreateDateColumn({
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP(6)',
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedat: Date;
}

export default BaseClassEntity;
