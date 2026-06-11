import "../lib/env.js";
import { connectToDatabase, closeDatabaseConnection } from "../lib/db.js";
import { seedDatabaseIfEmpty } from "../lib/seed.js";

async function main() {
  await connectToDatabase();
  const inserted = await seedDatabaseIfEmpty();
  console.log(inserted ? "Database seeded." : "Outpost baseline synced. Existing Rover records were preserved.");
  await closeDatabaseConnection();
}

main().catch(async (error) => {
  console.error("Seed failed.", error);
  await closeDatabaseConnection();
  process.exitCode = 1;
});
