import { AppDataSource } from "./lib/db/data-source";
import { Service } from "./lib/entities/Service";

async function seedServices() {
  try {
    // pastikan datasource connect
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const serviceRepo = AppDataSource.getRepository(Service);

    const services = [
      { service_name: "Ganti Oli", price: 50000 },
      { service_name: "Tune Up", price: 150000 },
      { service_name: "Servis Rem", price: 70000 },
      { service_name: "Ganti Busi", price: 30000 },
      { service_name: "Cuci Motor", price: 20000 },
    ];

    const existing = await serviceRepo.count();
    if (existing > 0) {
      console.log("Services already seeded.");
      return;
    }

    await serviceRepo.save(services);

    console.log("Service seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seedServices();
