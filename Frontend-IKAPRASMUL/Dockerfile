# syntax=docker/dockerfile:1

# ---- Dependencies stage ---------------------------------------------------
FROM node:20-alpine AS deps
# libc6-compat: needed by some native deps (e.g. sharp) on Alpine.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ---- Build stage ----------------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* vars are inlined into the client bundle at BUILD time, so they
# MUST be passed as build args (per mentor's note), not runtime env.
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# API_URL is read at build time by next.config.ts rewrites() (the /media proxy
# destination is baked into the routes manifest). Point it at the backend
# service so server-side proxying works inside the Docker network.
ARG API_URL=http://backend:8080
ENV API_URL=${API_URL}

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- Runtime stage --------------------------------------------------------
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as the unprivileged node user shipped in the base image.
USER node

# Standalone output: minimal server.js + traced node_modules. The public/ and
# .next/static folders are not bundled by server.js, so copy them in manually.
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

EXPOSE 3000

# API_URL is also read at RUNTIME by the BFF route handlers (/api/contact,
# /api/newsletter) and server components (content.ts). Supplied via compose.
CMD ["node", "server.js"]
