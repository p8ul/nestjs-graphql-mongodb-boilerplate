import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * @description
 * This is the base class from which all entities inherit.
 *
 * @docsCategory entities
 */
@ObjectType()
export abstract class BaseAppEntity extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  _id: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
