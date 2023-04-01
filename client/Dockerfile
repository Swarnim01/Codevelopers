FROM node:16-alpine3.17 as build

ENV NODE_ENV='PRODUCTION'

WORKDIR /usr/src/client

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 3000

CMD [ "npm" , "start" ]


# FROM nginx:1.23.3-alpine
# EXPOSE 3000
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /usr/src/client/build /usr/share/nginx/html



