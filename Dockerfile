FROM node:12.14.0-alpine

RUN mkdir /app
WORKDIR /app

COPY . .

RUN apk add --no-cache make gcc g++ python autoconf libtool automake zlib-dev nasm && \
  npm install --only=production && \
  npm run build && \
  apk del make gcc g++ python autoconf libtool automake zlib-dev nasm

CMD [ "npm", "start" ]

EXPOSE 3000
