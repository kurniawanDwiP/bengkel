import { Order } from "./Order";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from "typeorm";

@Entity("order_item")
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  service_id: string;
  @Column()
  service_name: string;
  @Column("numeric")
  price: number;
  @Column()
  quantity: number;
  @ManyToOne(() => Order, (order) => order.items)
  order: Relation<Order>;
}
