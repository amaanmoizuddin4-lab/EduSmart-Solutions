# Multi-stage Dockerfile to build frontend and run backend

# --- Frontend build stage ---
FROM node:20 AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
COPY frontend/ .
RUN npm ci --silent && npm run build

# --- Backend stage ---
FROM node:20
WORKDIR /app

# Install backend deps
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --production --silent

# Copy backend source
COPY backend ./backend

# Copy built frontend into backend/public
COPY --from=frontend /app/frontend/dist ./backend/public

WORKDIR /app/backend
ENV PORT=5000
EXPOSE 5000
CMD ["node", "src/server.js"]
