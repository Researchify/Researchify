FROM node:alpine

WORKDIR '/home/node/app'

COPY package.json .

# Option --legacy-peer-deps needed to resolve puppeteer cluster dep.
RUN npm install --legacy-peer-deps

COPY . .

USER node

CMD ["npm", "start"]