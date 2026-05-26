# =========================
# Build stage
# =========================
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# =========================
# Production stage
# =========================
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev

# Copy compiled application
COPY --from=builder /app/dist ./dist

# Copy locales if not already copied into dist by build script
# Remove this line if your build already places locales in dist/locales
COPY --from=builder /app/src/locales ./dist/locales

EXPOSE 3000

CMD ["node", "run", "start"]
