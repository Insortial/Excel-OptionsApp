FROM node:20

WORKDIR /react-app/

COPY public/ /react-app/public
COPY src/ /react-app/src
COPY package.json/ /react-app/
COPY index.html /react-app/
COPY package-lock.json/ /react-app/
COPY tsconfig.json/ /react-app/
COPY tsconfig.app.json/ /react-app/
COPY tsconfig.node.json/ /react-app/
COPY vite.config.ts/ /react-app/
COPY .env /react-app/

RUN npm i
RUN npm i -g serve
RUN npm run build

EXPOSE 4012

CMD ["serve", "-s", "dist", "-l", "4012"]