import { AppDataSource } from "./data-source";

let initialized = false;

export async function initDataSource() {
  if (!initialized) {
    await AppDataSource.initialize();
    initialized = true;
    console.log("Data source initialized");
  }
}
