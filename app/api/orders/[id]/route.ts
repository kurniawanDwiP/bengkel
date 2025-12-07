import "reflect-metadata";
import { OrderService } from "@/service/OrderService";
import { NextResponse } from "next/server";

const orderService = new OrderService();

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const order = await orderService.getOrderById(params.id);
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
