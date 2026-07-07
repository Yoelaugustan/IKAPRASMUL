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

# API_URL is read at runtime by server-side code and the /media Route Handler
# (the BFF proxy — the browser never talks to the backend directly, so no
# NEXT_PUBLIC_* var is needed here). It is NOT needed at build time.

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

CMD ["node", "server.js"]
