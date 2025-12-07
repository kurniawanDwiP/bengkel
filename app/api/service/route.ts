import { ServiceService } from "@/service/ServiceService";
import { NextResponse } from "next/server";

const serviceService = new ServiceService();

export async function GET() {
  try {
    const service = await serviceService.getAllServices();
    return NextResponse.json(service);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Gagal mengambil data" },
      { status: 500 },
    );
  }
}
