# apps/backend/Dockerfile
# Multi-stage production build for TicketPass NestJS Backend

FROM node:20-alpine AS builder

WORKDIR /app

# Install native dependencies required by Sharp and Prisma
RUN apk add --no-cache openssl libc6-compat python3 make g++

# Copy root configurations and workspace definitions
COPY package.json package-lock.json* tsconfig.base.json tsconfig.json ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/

# Install dependencies across workspaces
RUN npm install

# Copy shared library and build it first
COPY packages/shared/ ./packages/shared/
RUN npm run build:shared

# Copy backend source and Prisma schema
COPY apps/backend/ ./apps/backend/

# Generate Prisma Client
RUN npx prisma generate --schema=apps/backend/prisma/schema.prisma

# Build NestJS Backend
RUN npm run build:backend

# Production Runner Stage
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl libc6-compat

ENV NODE_ENV=production
ENV PORT=4000

# Copy root files
COPY package.json ./

# Copy built node_modules and artifacts from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/shared/package.json ./packages/shared/package.json
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/prisma ./apps/backend/prisma
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json

WORKDIR /app/apps/backend

EXPOSE 4000

# Run Prisma migrations & start NestJS server
CMD ["sh", "-c", "npx prisma migrate deploy && if [ -f dist/main.js ]; then node dist/main.js; else node dist/src/main.js; fi"]
