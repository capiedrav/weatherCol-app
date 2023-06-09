# Dockerfile for main branch of weatherCol-app

FROM node:16-alpine as unzipper
# install unzip command
RUN apk add unzip
# download and build weatherAPI SDK
WORKDIR /weatherAPI
ADD https://github.com/weatherapicom/weatherapi-Node-js/archive/refs/heads/CodeGen-NODE.zip ./
RUN unzip CodeGen-NODE.zip && mv weatherapi-Node-js-CodeGen-NODE weatherAPILib
WORKDIR /weatherAPI/weatherAPILib
RUN npm install

FROM node:16-alpine
ENV NODE_ENV=prod
# install dependencies for weatherCol-app
WORKDIR /usr/src/weatherCol-app
COPY package*.json ./
RUN npm install --production && mkdir node_modules/weatherAPILib && mv node_modules ../

# copy WeatherAPILib from "unzipper" image into "node_modules/weatherAPILib" folder
# "COPY" copies the contents of a directory, not the directory itself
COPY --from=unzipper /weatherAPI/weatherAPILib/ ../node_modules/weatherAPILib

EXPOSE 8000

CMD ["node", "server.js"]
COPY . .
