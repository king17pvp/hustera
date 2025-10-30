# Simple Dockerfile for running the Express backend locally with Node.

FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci --silent; else npm install --silent; fi && \
    npm install cors --silent

COPY . .

ENV NODE_ENV=development

EXPOSE 5000

CMD ["node", "src/server.js"]
