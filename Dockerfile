# Stage 1: Build frontend
FROM node:18 AS frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Build backend
FROM node:18 AS backend-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server ./
RUN npm run build

# Stage 3: Final stage
FROM node:18-alpine
WORKDIR /app

# Copy backend
COPY --from=backend-build /app/server/dist ./dist
COPY --from=backend-build /app/server/package*.json ./

# Copy frontend build
COPY --from=frontend-build /app/dist ./public

# Install production dependencies
RUN npm install --only=production

# Expose port
EXPOSE 3001

# Start the server
CMD ["node", "dist/index.js"]
