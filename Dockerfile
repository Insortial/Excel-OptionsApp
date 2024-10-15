FROM node:20

WORKDIR /react-app/

COPY public/ /react-app/public
COPY src/ /react-app/src
COPY package.json/ /react-app/

RUN npm i