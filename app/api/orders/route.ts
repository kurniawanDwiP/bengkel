import "reflect-metadata";
import { CreateOrderDto } from "@/lib/dto/create-order.dto";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { ApiResponseBuilder } from "@/lib/utils/Response";
import { initDataSource } from "@/lib/db/init-db";
import { createOrderService } from "@/lib/container";

const orderService = createOrderService();

export async function GET() {
  try {
    await initDataSource();
    const orders = await orderService.getAllOrders();
    return ApiResponseBuilder.ok("Orders fetched succeffully", orders);
  } catch (error) {
    console.error(error);

    return new ApiResponseBuilder()
      .setSuccess(false)
      .setMessage("Failed to fetch orders")
      .setStatus(500)
      .build();
  }
}

export async function POST(req: Request) {
  try {
    await initDataSource();
    const body = await req.json();
    const dto = plainToInstance(CreateOrderDto, body);
    await validateOrReject(dto);
    const newOrder = await orderService.createOrder(dto);
    return new ApiResponseBuilder()
      .setSuccess(true)
      .setMessage("Order created successfully")
      .setData(newOrder)
      .setStatus(201)
      .build();
  } catch (error) {
    console.error(error);
    return new ApiResponseBuilder()
      .setSuccess(false)
      .setMessage("Failed to validate dto")
      .setData(error)
      .setStatus(400)
      .build();
  }
}
