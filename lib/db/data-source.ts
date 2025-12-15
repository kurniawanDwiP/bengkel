import "reflect-metadata";
import { DataSource } from "typeorm";
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";
import { Service } from "../entities/Service";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [Order, OrderItem, Service],
  synchronize: true,
  logging: false,
});
