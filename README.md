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

## Authentication and Token Usage

### When is Authentication Required?

Authentication is required whenever a user wants to access protected resources or perform actions that are specific to their account. This typically includes:

- Logging in to the application
- Accessing or modifying personal financial data
- Creating, updating, or deleting expenses and categories
- Any API endpoint that requires user identification

### How Does Authentication Work?

1. **Login:**  
   The user provides their email (and, in a real-world scenario, a password) to the login endpoint.
2. **Token Generation:**  
   Upon successful authentication, the backend issues two tokens:
   - **Access Token:** Used for authenticating API requests.
   - **Refresh Token:** Used to obtain a new access token when the current one expires.

### When and How to Use the Token

- **Access Token:**

  - Must be included in the `Authorization` header as a Bearer token for all protected API requests.
  - Example:
    ```
    Authorization: Bearer <access_token>
    ```
  - The backend will validate this token before processing the request.

- **Refresh Token:**
  - Used only when the access token has expired.
  - Sent to a dedicated refresh endpoint to obtain a new access token.
  - Should be stored securely (e.g., HTTP-only cookie or secure storage).
