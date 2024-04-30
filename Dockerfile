FROM node:17.9.0 AS builder


# Clear npm cache
RUN npm cache clean --force

WORKDIR /app

RUN npm config set legacy-peer-deps true

# Installing dependencies
COPY ./package.json /app
RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable

COPY nginx-default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html