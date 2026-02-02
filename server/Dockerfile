# Stage 1: Build with Bun
FROM oven/bun:alpine AS builder

WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . ./
RUN bun build ./src/index.ts --outfile ./dist/index.js

# Stage 2: Run
FROM oven/bun:alpine AS runner

WORKDIR /app
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["bun", "./dist/index.js"]
