# Fin-Link Gym Booking System

A professional Expo-based gym booking application with a Fastify-powered backend, designed for scalability and high-concurrency environments.

## 1. Quick Start

### Prerequisites
- **Node.js**: v20.11.0 (LTS recommended). Use `nvm use` in the frontend/backend folders.
- **Package Manager**: npm

### Running the Backend
```bash
cd backend
npm install
npm run dev
```
*The server will listen on `http://0.0.0.0:3000` to allow emulator and cross-device connections.*

### Running the Frontend
```bash
cd frontend
npm install
npx expo start
```
*The app automatically detects the host IP for Android Emulators and physical devices scanned via QR code in Expo.*

---

## 2. Key Architectural Decisions

### Domain-Driven Design (DDD) & Immutability
The core booking logic is encapsulated within the `Gym` entity (`backend/src/modules/gyms/gym.entity.ts`). 
- **Decision**: The entity is immutable; every state change returns a new instance.
- **Why**: This prevents side effects and makes the code extremely predictable and easy to unit test. Business rules (like "prevent double booking" and "capacity limits") live in the domain, not the service layer.

### Concurrency & Thread-Safety (Atomic Updates)
To handle the "stale read" race condition where two users might book the last slot simultaneously:
- **Decision**: Implemented a `withLock` pattern in the `GymRepository`.
- **Why**: This serializes operations per Gym ID during the critical Read-Modify-Write cycle. In a production environment with multiple server instances, this would typically be replaced by a Redis-based distributed lock or a Database Transaction with an isolation level of `REPEATABLE READ` or `SERIALIZABLE`.

### Dependency Inversion
The service layer (`GymService`) depends on the `GymRepository` interface, not a concrete implementation.
- **Why**: This allows for seamless transitions between the current `InMemory` mock and a persistent database (Postgres/MongoDB) without modifying the business logic.

---

## 3. Trade-offs & Future Improvements

Given the constraints of a rapid implementation, the following trade-offs were made:

- **Authentication/Identity**: Currently, the system assumes a hardcoded `user123`. A production system would implement JWT-based authentication and a robust User entity.
- **Persistent Storage**: Data is currently held in memory. Future iterations would integrate a persistent database with migrations (e.g., Prisma with PostgreSQL).
- **Monitoring & Observability**: While verbose logging is enabled for tests, a production app would benefit from structured logging (Pino) and APM (Application Performance Monitoring) tools like Sentry or New Relic.
- **Service Discovery**: The API URL is resolved dynamically via `expo-constants`. In a scaled environment, this would be managed through environment-specific CI/CD variables and a reverse proxy/load balancer.

---

## 4. Submission Guidelines
- **GitHub Repository**: [Link to private repository]
- **Documentation**: This README covers the core operational and architectural details. 
- **Tests**: Comprehensive unit and integration tests are located in `backend/tests`. Run them via `npm run test` in the backend folder.
