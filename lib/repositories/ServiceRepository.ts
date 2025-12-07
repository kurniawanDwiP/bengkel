import { Repository } from "typeorm";
import { Service } from "../entities/Service";
import { AppDataSource } from "../db/data-source";

export class ServiceRepository {
  private serviceRepository: Repository<Service>;
  constructor() {
    this.serviceRepository = AppDataSource.getRepository(Service);
  }

  async findAll(): Promise<Service[]> {
    return await this.serviceRepository.find();
  }

  async findById(id: string): Promise<Service> | null {
    return await this.serviceRepository.findOneBy({ id });
  }
}
