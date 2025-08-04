import knex from "knex";
import { config } from "../../shared/config";

import type { Knex } from "knex";

const db = config.get("db");

export class Database {
  private static initialized: boolean = false;

  private static _instance: Knex;

  public static init(): void {
    if (Database.initialized) {
      return;
    }

    const config: Knex.Config = {
      client: "pg",
      connection: {
        database: db.database,
        host: db.host,
        password: db.password,
        port: Number(db.port),
        user: db.user,
      },
      debug: false,
      pool: {
        min: 2,
        max: 10,
        // How long to wait (in ms) for a connection to become available
        acquireTimeoutMillis: 30000,
        // How long to wait (in ms) for a connection to be established
        createTimeoutMillis: 30000,
        // How long (in ms) a connection can remain idle before being removed
        idleTimeoutMillis: 30000,
        // How often (in ms) to check for idle connections
        reapIntervalMillis: 1000,
      },
    };

    Database._instance = knex(config);

    Database.initialized = true;
  }

  public static async destroy(): Promise<void> {
    if (!!Database._instance) {
      await Database._instance.destroy();
    }

    Database.initialized = false;
  }

  public static instance(): Knex {
    if (!Database.initialized) {
      Database.init();
    }

    return Database._instance;
  }
}
