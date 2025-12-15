import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { OrderItem } from "./OrderItem";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  customer_name: string;
  @Column({ nullable: true })
  contact: string;
  @CreateDateColumn()
  created_at: Date;
  @Column()
  total: number;
  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: Relation<OrderItem[]>;
}
