# Build stage for React frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci --only=production
COPY client/ ./
RUN npm run build

# Build stage for Node.js backend
FROM node:18-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ ./

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Copy backend
COPY --from=backend-build /app/backend ./backend

# Copy frontend build
COPY --from=frontend-build /app/client/build ./client/build

# Create a startup script
RUN echo '#!/bin/sh\ncd /app/backend && node server.js' > /app/start.sh
RUN chmod +x /app/start.sh

# Expose port
EXPOSE 5000

# Start the application
CMD ["/app/start.sh"]