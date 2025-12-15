import { ServiceRepository } from "@/lib/repositories/ServiceRepository";

export class ServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async getAllServices() {
    return await this.serviceRepository.findAll();
  }
}
