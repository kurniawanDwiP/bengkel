import { ServiceService } from "@/service/ServiceService";
import { NextResponse } from "next/server";

export async function GET() {
  const serviceService = new ServiceService();
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
