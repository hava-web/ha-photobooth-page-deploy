FROM node:18-alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .
RUN yarn build

FROM node:18-alpine as runner
WORKDIR /app
COPY --from=builder /app/.next/standalone /app
COPY --from=builder /app/public /app/public
COPY --from=builder /app/.next/static /app/.next/static
EXPOSE 3000

ENTRYPOINT ["node", "server.js"]