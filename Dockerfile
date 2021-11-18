FROM node:alpine

RUN mkdir -p /usr/src/app_backend

WORKDIR /usr/src/app_backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "dev" ]