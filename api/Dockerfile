FROM node:alpine

WORKDIR '/home/node/app'

COPY package.json .

ENV NODE_ENV=production

RUN npm install

COPY . .

USER node

CMD ["npm", "start"]