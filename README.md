# StudentVoice Application

This application is a full-stack solution using React for the frontend, Express for the backend, and SurrealDB for the database.

## Prerequisites

- Node.js (v18 or later)
- npm
- Docker and Docker Compose (for production deployment)

## Development Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd studentvoice
   ```

2. Install dependencies:
   ```
   npm install
   cd server && npm install && cd ..
   ```

3. Set up environment variables:
   - Copy `.env.development` to `.env` and adjust values if needed

4. Start the development server:
   ```
   npm run dev
   ```

This will start both the frontend and backend in development mode.

## Production Deployment with Docker Compose

1. Ensure Docker and Docker Compose are installed on your system.

2. Build and run the Docker containers:
   ```
   docker-compose up --build
   ```

This command will build the application image and start both the application and SurrealDB containers.

3. The application will be available at `http://127.0.0.1:3001`

To stop the containers, use:
```
docker-compose down
```

## API Endpoints

- POST /api/signup: Create a new user account
- POST /api/login: Authenticate a user

## Environment Variables

- `VITE_API_URL`: The URL for the API (default: /api)
- `SURREALDB_URL`: The URL for the SurrealDB instance (default: http://surrealdb:8000 in Docker environment)

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
