FROM node:16-alpine3.17

ENV NODE_ENV='DEVELOPMENT'

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm" , "start" ]


