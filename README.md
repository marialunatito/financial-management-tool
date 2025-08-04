## Project structure

financial-tracker-backend/
├── src/
│ ├── app/ # Use cases (Application)
│ ├── domain/ # Entities and business logic
│ ├── infrastructure/ # External adapters (DB, Express, Logger, etc)
│ ├── interfaces/ # Primary adapters (HTTP Controllers, etc)
│ ├── shared/ # Common helpers (error handling, logger, config)
│ └── index.js # Entry point
├── .env
├── package.json
└── README.md
