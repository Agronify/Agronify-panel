FROM node:18-alpine
COPY . /app
WORKDIR /app
RUN apk update && apk add bash
RUN npm install -g vite serve
