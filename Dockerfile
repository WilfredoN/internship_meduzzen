FROM node:18-alpine

WORKDIR /internship-docker/

COPY public/ /internship-docker/public
COPY src/ /internship-docker/src
COPY package.json /internship-docker/

RUN npm install

CMD["npm", "start"]
