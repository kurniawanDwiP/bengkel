import { AppDataSource } from "@/lib/db/data-source";
import { Order } from "@/lib/entities/Order";
import { Service } from "@/lib/entities/Service";
import { OrderRepository } from "@/lib/repositories/OrderRepository";
import { ServiceRepository } from "@/lib/repositories/ServiceRepository";
import { OrderService } from "@/service/OrderService";
import { ServiceService } from "@/service/ServiceService";

export function createOrderService() {
  const orderRepo = new OrderRepository(AppDataSource.getRepository(Order));

  const serviceRepo = new ServiceRepository(
    AppDataSource.getRepository(Service),
  );

  return new OrderService(orderRepo, serviceRepo);
}

export function createServiceService() {
  const serviceRepo = new ServiceRepository(
    AppDataSource.getRepository(Service),
  );
  return new ServiceService(serviceRepo);
}
