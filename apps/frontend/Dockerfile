# apps/frontend/Dockerfile
# Multi-stage production build for TicketPass Next.js 15 Frontend

FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat

# Copy root configurations and workspace manifests
COPY package.json package-lock.json* tsconfig.base.json tsconfig.json ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/backend/package.json ./apps/backend/

# Install dependencies across all workspaces
RUN npm install

# Copy shared library code and build
COPY packages/shared/ ./packages/shared/
RUN npm run build:shared

# Copy frontend source
COPY apps/frontend/ ./apps/frontend/

# Set production environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build Next.js application
RUN npm run build:frontend

# Runner Stage
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Copy root and dependencies
COPY package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/shared/package.json ./packages/shared/package.json
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public
COPY --from=builder /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=builder /app/apps/frontend/package.json ./apps/frontend/package.json
COPY --from=builder /app/apps/frontend/next.config.mjs ./apps/frontend/next.config.mjs

WORKDIR /app/apps/frontend

EXPOSE 3000

CMD ["npx", "next", "start", "-p", "3000"]
