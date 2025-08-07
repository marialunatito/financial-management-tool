require("dotenv").config();

import { Database } from "./infraestructure/database/db";
import { startServer } from "./interfaces/http/server";

async function main() {
  try {
    Database.init();
    await startServer();
  } catch (err) {
    console.error("🔥 Error on startup:", err);
    process.exit(1);
  }
}

main();
