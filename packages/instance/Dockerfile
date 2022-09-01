FROM node:16.17.0-alpine3.16

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD yarn start
