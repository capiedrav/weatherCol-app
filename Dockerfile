FROM node:16-alpine
ENV NODE_ENV=dev
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && mv node_modules ../
COPY . .
EXPOSE 8000
CMD ["npx", "nodemon", "server.js"]
