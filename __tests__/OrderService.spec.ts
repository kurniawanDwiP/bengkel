import { CreateOrderDto } from "@/lib/dto/create-order.dto";
import { OrderService } from "@/service/OrderService";
import { Order } from "@/lib/entities/Order";
import { mockServiceRepository } from "./mocks/serviceRespository.mock";
import { mockOrderRepository } from "./mocks/orderRepository.mock";

describe("OrderService", () => {
  let orderService: OrderService;

  beforeEach(() => {
    jest.clearAllMocks();

    orderService = new OrderService(
      mockOrderRepository as any,
      mockServiceRepository as any,
    );
  });

  describe("createOrder()", () => {
    it("should create order successfully", async () => {
      // ARRANGE
      const dto: CreateOrderDto = {
        customer_name: "Budi",
        contact: "08123456789",
        items: [
          { service_id: "service-1", quantity: 2 },
          { service_id: "service-2", quantity: 1 },
        ],
      };

      mockServiceRepository.findById
        .mockResolvedValueOnce({
          id: "service-1",
          service_name: "Ganti Oli",
          price: 50000,
        })
        .mockResolvedValueOnce({
          id: "service-2",
          service_name: "Cuci Motor",
          price: 30000,
        });

      mockOrderRepository.saveOrder.mockImplementation(
        async (order: Order) => order,
      );
      const result = await orderService.createOrder(dto);
      expect(result.customer_name).toBe("Budi");
      expect(result.items).toHaveLength(2);
      expect(result.total).toBe(130000);

      expect(mockServiceRepository.findById).toHaveBeenCalledTimes(2);
      expect(mockOrderRepository.saveOrder).toHaveBeenCalledTimes(1);
    });

    it("should throw error if service not found", async () => {
      const dto: CreateOrderDto = {
        customer_name: "Budi",
        contact: "08123456789",
        items: [{ service_id: "invalid", quantity: 1 }],
      };
      mockServiceRepository.findById.mockResolvedValue(null);
      await expect(orderService.createOrder(dto)).rejects.toThrow(
        "Service tidak ditemukan",
      );
    });
  });

  describe("getAllOrders()", () => {
    it("should return all orders", async () => {
      const orders: Order[] = [{ id: "1" } as Order, { id: "2" } as Order];
      mockOrderRepository.getAll.mockResolvedValue(orders);
      const result = await orderService.getAllOrders();
      expect(result).toEqual(orders);
      expect(mockOrderRepository.getAll).toHaveBeenCalled();
    });
  });

  describe("getOrderById()", () => {
    it("should return order when found", async () => {
      const order = { id: "order-1" } as Order;
      mockOrderRepository.findById.mockResolvedValue(order);
      const result = await orderService.getOrderById("order-1");
      expect(result).toEqual(order);
    });

    it("should return null if not found", async () => {
      mockOrderRepository.findById.mockResolvedValue(null);
      const result = await orderService.getOrderById("invalid");
      expect(result).toBeNull();
    });
  });

  describe("updateOrder()", () => {
    it("should update order successfully", async () => {
      const order = { id: "order-1" } as Order;
      mockOrderRepository.findById.mockResolvedValue(order);
      mockOrderRepository.updateOrder.mockResolvedValue({
        ...order,
        customer_name: "Updated",
      });

      const result = await orderService.updateOrder("order-1", {
        customer_name: "Updated",
      });

      expect(result.customer_name).toBe("Updated");
      expect(mockOrderRepository.updateOrder).toHaveBeenCalled();
    });

    it("should throw error if order not found", async () => {
      mockOrderRepository.findById.mockResolvedValue(null);

      await expect(orderService.updateOrder("invalid", {})).rejects.toThrow(
        "Order id not found",
      );
    });
  });
});
