FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent

RUN npm install nodemon --save-dev
COPY . ./

CMD ["nodemon", "--exec", "npm", "start"]