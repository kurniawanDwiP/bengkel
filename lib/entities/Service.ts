import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Service {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  service_name: string;
  @Column("numeric")
  price: number;
  @Column({ nullable: true })
  description: string;
}
