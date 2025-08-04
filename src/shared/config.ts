import convict from "convict";

export const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "staging", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  db: {
    host: {
      doc: "Database host name/IP",
      format: String,
      default: "localhost",
      env: "DB_HOST",
    },
    port: {
      doc: "Database port",
      format: "port",
      default: "5432",
      env: "DB_PORT",
    },
    user: {
      doc: "Database username",
      format: String,
      default: "postgres",
      env: "DB_USER",
    },
    password: {
      doc: "Database password",
      format: String,
      default: "postgres",
      env: "DB_PASSWORD",
    },
    database: {
      doc: "Database name",
      format: String,
      default: "atlas-local-v3",
      env: "DB_DATABASE",
    },
  },
  cache: {
    host: {
      doc: "Cache host name/IP",
      format: String,
      default: "localhost",
      env: "REDIS_HOST",
    },
    port: {
      doc: "Cache port",
      format: "port",
      default: "6379",
      env: "REDIS_PORT",
    },
    username: {
      doc: "Cache username",
      format: String,
      default: "",
      env: "REDIS_USERNAME",
    },
    password: {
      doc: "Cache password",
      format: String,
      default: "admin",
      env: "REDIS_PASSWORD",
    },
    tlsEnabled: {
      doc: "Cache TLS enabled",
      format: Boolean,
      default: false,
      env: "REDIS_TLS_ENABLE",
    },
  },
  billing: {
    startDatePeriod: {
      doc: "The day of the month when the billing period starts and when renewals are processed",
      format: Number,
      default: 25, // start day of the period
      env: "START_DATE_PERIOD",
    },
    endDatePeriod: {
      doc: "The day of the month when the billing period ends",
      format: Number,
      default: 24, // end day of the period
      env: "END_DATE_PERIOD",
    },
  },
  slack: {
    channels: {
      salesHandoff: {
        doc: "The channel for sales handoff",
        format: String,
        default: "#sales-handoff-cuentas",
        env: "SLACK_SALES_HANDOFF_CHANNEL",
      },
    },
  },
});
