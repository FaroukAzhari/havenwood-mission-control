import "./lib/env.js";
import { createApp } from "./app.js";
import { connectToDatabase } from "./lib/db.js";
import { seedDatabaseIfEmpty } from "./lib/seed.js";

const port = process.env.PORT || 4000;

async function start() {
  await connectToDatabase();
  await seedDatabaseIfEmpty();

  const app = createApp();
  app.listen(port, () => {
    console.log(`Last Outpost server listening on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start Last Outpost server.", error);
  process.exitCode = 1;
});
