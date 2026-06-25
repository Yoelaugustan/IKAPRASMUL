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
# MUST be passed as build args, not runtime env.
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# API_URL is read at runtime by server-side code and the /media Route Handler.
# It is NOT needed at build time — do not add it as a build arg.

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
