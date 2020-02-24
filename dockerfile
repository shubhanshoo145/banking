FROM node:10.16.3-jessie
WORKDIR /usr/src/app
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 4703
ENTRYPOINT node index.js
