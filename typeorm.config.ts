import { DataSource } from "typeorm";
import { Order } from "./lib/entities/Order";
import { OrderItem } from "./lib/entities/OrderItem";
import { Service } from "./lib/entities/Service";

export default new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [Order, OrderItem, Service],
  migrations: ["lib/db/migrations/*{.js,.ts}"],
  migrationsTableName: "migrations",
  migrationsTransactionMode: "all",
  synchronize: false,
  logging: false,
});
