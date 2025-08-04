# Project structure

```
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
```

## Functional Description

This project is an API tool that helps you manage your daily expenses and understand which categories you could reduce spending in.

## Technical description

The technical goal is to implement Hexagonal Architecture and various design patterns. The focus is on demonstrating technical skills in:

- design patterns
- clean architecture management
- error management
- log management
- API security management (JWT authentication)
- integration test
- unit test
