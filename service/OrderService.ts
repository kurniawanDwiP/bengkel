import { OrderRepository } from "@/lib/repositories/OrderRepository";
import { CreateOrderDto } from "@/lib/dto/create-order.dto";
import { Order } from "@/lib/entities/Order";
import { OrderItem } from "@/lib/entities/OrderItem";
import { ServiceRepository } from "@/lib/repositories/ServiceRepository";

export class OrderService {
  constructor(
    private readonly orderRepository = new OrderRepository(),
    private readonly serviceRepository = new ServiceRepository(),
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const order = new Order();
    order.customer_name = dto.customer_name;
    order.contact = dto.contact;
    order.items = [];

    let total = 0;

    for (const item of dto.items) {
      const service = await this.serviceRepository.findById(item.service_id);
      if (!service) throw new Error("Service tidak ditemukan");

      const orderItem = new OrderItem();
      orderItem.service_id = service.id;
      orderItem.service_name = service.service_name;
      orderItem.price = service.price;
      orderItem.quantity = item.quantity;

      total += service.price * item.quantity;

      order.items.push(orderItem);
    }

    order.total = total;

    return await this.orderRepository.saveOrder(order);
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.getAll();
  }

  async getOrderById(id: string): Promise<Order> | null {
    return await this.orderRepository.findById(id);
  }

  async updateOrder(id: string, dto: Partial<Order>): Promise<Order> {
    const order = await this.findOneOrFail(id);
    return await this.orderRepository.updateOrder(order, dto);
  }

  private async findOneOrFail(id: string) {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new Error("Order id not found");
    }
    return order;
  }
}
