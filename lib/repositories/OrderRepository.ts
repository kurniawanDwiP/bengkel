import { Repository } from "typeorm";
import { Order } from "../entities/Order";

export class OrderRepository {
  constructor(private orderRepository: Repository<Order>) {}

  async saveOrder(order: Order): Promise<Order> {
    return await this.orderRepository.save(order);
  }

  async findById(id: string): Promise<Order | null> {
    return await this.orderRepository.findOne({
      where: { id },
      relations: { items: true },
    });
  }

  async getAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      order: { created_at: "DESC" },
      relations: { items: true },
    });
  }

  async updateOrder(order: Order, dto: Partial<Order>): Promise<Order> {
    Object.assign(order, dto);
    return await this.orderRepository.save(order);
  }
}
