import "reflect-metadata";
import { CreateOrderDto } from "@/lib/dto/create-order.dto";
import { OrderService } from "@/service/OrderService";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { NextResponse } from "next/server";

const orderService = new OrderService();

export async function GET() {
  try {
    const orders = await orderService.getAllOrders();
    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Gagal mengambil data" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const dto = plainToInstance(CreateOrderDto, body);
    await validateOrReject(dto);
    const newOrder = await orderService.createOrder(dto);
    return NextResponse.json(newOrder, {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Validasi gagal", error },
      { status: 400 },
    );
  }
}
