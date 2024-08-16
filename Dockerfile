FROM node:20.16.0 AS build

WORKDIR /app

COPY . .

RUN npm install && npm run build

# -----------------------------

FROM node:20.16.0

WORKDIR /app

COPY --from=build /app/package*.json .
COPY --from=build /app/dist .
COPY --from=build /app/prisma .

RUN npm install --omit=dev

CMD ["sh", "-c", "npx prisma generate && npx prisma db push && node server.cjs"]
