# Estágio de Build
FROM node:20-alpine AS builder

WORKDIR /app

# Instalação do OpenSSL para compatibilidade com os binários do Prisma no Alpine Linux
RUN apk add --no-cache openssl libc6-compat

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

RUN npm install --legacy-peer-deps
RUN npx prisma generate --schema=./prisma/schema.sqlite.prisma

COPY src ./src
RUN npm run build

# Estágio de Produção
FROM node:20-alpine AS runner

WORKDIR /app

# Instalação do OpenSSL no container de execução
RUN apk add --no-cache openssl libc6-compat

ENV NODE_ENV=production
ENV PORT=10000
ENV DATABASE_URL="file:./prisma/store.db"

COPY package*.json ./
RUN npm install --omit=dev --legacy-peer-deps

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 10000

CMD ["sh", "-c", "./node_modules/.bin/prisma db push --schema=./prisma/schema.sqlite.prisma && node dist/server.js"]
