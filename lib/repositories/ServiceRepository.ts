import { Repository } from "typeorm";
import { Service } from "../entities/Service";

export class ServiceRepository {
  constructor(private serviceRepository: Repository<Service>) {}

  async findAll(): Promise<Service[]> {
    return await this.serviceRepository.find();
  }

  async findById(id: string): Promise<Service | null> {
    return await this.serviceRepository.findOneBy({ id });
  }
}
