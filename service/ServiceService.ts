import { ServiceRepository } from "@/lib/repositories/ServiceRepository";

export class ServiceService {
  constructor(private readonly serviceRepository = new ServiceRepository()) {}

  async getAllServices() {
    return await this.serviceRepository.findAll();
  }
}
