FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm install --legacy-peer-deps
COPY . .
ENV PUBLIC_API_URL=https://strapi.quoteapp.de/api
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]