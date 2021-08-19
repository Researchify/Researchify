FROM node

USER node

RUN mkdir -p '/home/node/app'
WORKDIR '/home/node/app'

COPY --chown=node:node service/package.json ./service/
COPY --chown=node:node base/package.json ./base/

ENV NODE_ENV=production

RUN npm install --prefix ./service
RUN npm install --prefix ./base

COPY --chown=node:node ./service ./service
COPY --chown=node:node ./base ./base

CMD ["npm", "start", "--prefix", "./service"]