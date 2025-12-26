import { AppDataSource } from "./data-source";
export async function initDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log("Data source initialized");
  }
}
