FROM node:alpine

WORKDIR '/home/node/app'

RUN mkdir -p ./service/node_modules
RUN mkdir -p ./base/node_modules

COPY service/package.json ./service
COPY base/package.json ./base

RUN npm install --prefix ./service
RUN npm install --prefix ./base

COPY ./service ./service
COPY ./base ./base

USER node

CMD ["npm", "run", "start", "--prefix", "./service"]