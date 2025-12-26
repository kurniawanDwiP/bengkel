import { createServiceService } from "@/lib/container";
import { initDataSource } from "@/lib/db/init-db";
import { ApiResponseBuilder } from "@/lib/utils/Response";

const serviceService = createServiceService();

export async function GET() {
  try {
    await initDataSource();
    const service = await serviceService.getAllServices();
    return new ApiResponseBuilder()
      .setSuccess(true)
      .setMessage("Service fetched successfully")
      .setData(service)
      .setStatus(200)
      .build();
  } catch (error) {
    console.error(error);
    return new ApiResponseBuilder()
      .setSuccess(false)
      .setMessage("Failed fetch service")
      .setData(error)
      .setStatus(500)
      .build();
  }
}
