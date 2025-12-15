import { OrderService } from "@/service/OrderService";
import { Order } from "@/lib/entities/Order";
import { Service } from "@/lib/entities/Service";
import { CreateOrderDto } from "@/lib/dto/create-order.dto";

/**
 * Mock repository
 */
const mockOrderRepository = {
  saveOrder: jest.fn(),
  getAll: jest.fn(),
  findById: jest.fn(),
  updateOrder: jest.fn(),
};

const mockServiceRepository = {
  findById: jest.fn(),
};

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
    it("should create order and calculate total correctly", async () => {
      const dto: CreateOrderDto = {
        customer_name: "Budi",
        contact: "08123456789",
        items: [
          { service_id: "s1", quantity: 2 },
          { service_id: "s2", quantity: 1 },
        ],
      };

      mockServiceRepository.findById
        .mockResolvedValueOnce({
          id: "s1",
          service_name: "Ganti Oli",
          price: 50000,
        } as Service)
        .mockResolvedValueOnce({
          id: "s2",
          service_name: "Tune Up",
          price: 150000,
        } as Service);

      mockOrderRepository.saveOrder.mockImplementation(
        async (order: Order) => order,
      );

      const result = await orderService.createOrder(dto);

      expect(result.total).toBe(250000);
      expect(result.items).toHaveLength(2);
      expect(result.items[0].service_name).toBe("Ganti Oli");
      expect(mockOrderRepository.saveOrder).toHaveBeenCalledTimes(1);
    });

    it("should throw error if service not found", async () => {
      mockServiceRepository.findById.mockResolvedValue(null);

      const dto: CreateOrderDto = {
        customer_name: "Budi",
        contact: "081234",
        items: [{ service_id: "invalid", quantity: 1 }],
      };

      await expect(orderService.createOrder(dto)).rejects.toThrow(
        "Service tidak ditemukan",
      );
    });
  });

  describe("getAllOrders()", () => {
    it("should return all orders", async () => {
      const orders = [{ id: "1" }, { id: "2" }] as Order[];

      mockOrderRepository.getAll.mockResolvedValue(orders);

      const result = await orderService.getAllOrders();

      expect(result).toEqual(orders);
      expect(mockOrderRepository.getAll).toHaveBeenCalled();
    });
  });

  describe("getOrderById()", () => {
    it("should return order if found", async () => {
      const order = { id: "1" } as Order;

      mockOrderRepository.findById.mockResolvedValue(order);

      const result = await orderService.getOrderById("1");

      expect(result).toEqual(order);
    });

    it("should return null if not found", async () => {
      mockOrderRepository.findById.mockResolvedValue(null);

      const result = await orderService.getOrderById("999");

      expect(result).toBeNull();
    });
  });

  describe("updateOrder()", () => {
    it("should update order", async () => {
      const order = { id: "1" } as Order;

      mockOrderRepository.findById.mockResolvedValue(order);
      mockOrderRepository.updateOrder.mockResolvedValue({
        ...order,
        customer_name: "Updated",
      });

      const result = await orderService.updateOrder("1", {
        customer_name: "Updated",
      });

      expect(result.customer_name).toBe("Updated");
    });

    it("should throw error if order not found", async () => {
      mockOrderRepository.findById.mockResolvedValue(null);

      await expect(orderService.updateOrder("999", {})).rejects.toThrow(
        "Order id not found",
      );
    });
  });
});
