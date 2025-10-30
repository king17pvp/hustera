# Simple Dockerfile for local development with Vite dev server.

FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Clean install with force to fix optional deps
RUN rm -rf node_modules package-lock.json && \
    npm install --silent

# Copy source
COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173" ]
