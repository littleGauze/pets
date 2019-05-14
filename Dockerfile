FROM node:10.15.3-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn global add @vue/cli \
  && yarn

COPY . .
RUN yarn build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
