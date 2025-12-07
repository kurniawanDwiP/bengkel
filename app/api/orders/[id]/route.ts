import "reflect-metadata";
import { OrderService } from "@/service/OrderService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const orderService = new OrderService();
  try {
    const { id } = await context.params;
    const order = await orderService.getOrderById(id);
    if (!order) {
      return NextResponse.json(
        { message: "Order tidak ditemukan" },
        { status: 404 },
      );
    }
    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
