import "reflect-metadata";
import { OrderService } from "@/service/OrderService";
import { NextRequest } from "next/server";
import { ApiResponseBuilder } from "@/lib/utils/Response";

const orderService = new OrderService();

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await ctx.params;
    const order = await orderService.getOrderById(id);
    if (!order) {
      return new ApiResponseBuilder()
        .setSuccess(false)
        .setMessage("Order not found")
        .setData(null)
        .setStatus(404)
        .build();
    }
    return new ApiResponseBuilder()
      .setSuccess(true)
      .setMessage(`Order with id:${id} fetched successfully`)
      .setData(order)
      .setStatus(200)
      .build();
  } catch (error) {
    console.error(error);
    return new ApiResponseBuilder()
      .setSuccess(false)
      .setMessage("Internal server error")
      .setData(null)
      .setStatus(500)
      .build();
  }
}

export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    const body = await req.json();
    const { id } = await ctx.params;
    const updatedOrder = await orderService.updateOrder(id, body);
    return new ApiResponseBuilder()
      .setSuccess(true)
      .setMessage("Order updated successfully")
      .setData(updatedOrder)
      .setStatus(200)
      .build();
  } catch (error) {
    console.error(error);
    return new ApiResponseBuilder()
      .setSuccess(true)
      .setMessage("Failed update order")
      .setData(error)
      .setStatus(400)
      .build();
  }
}
