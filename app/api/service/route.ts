import { ApiResponseBuilder } from "@/lib/utils/Response";
import { ServiceService } from "@/service/ServiceService";

const serviceService = new ServiceService();

export async function GET() {
  try {
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
