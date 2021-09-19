FROM mcr.microsoft.com/playwright:focal

WORKDIR '/home/node/app'

COPY package.json .

ENV NODE_ENV=production

RUN npm install

COPY . .

USER pwuser

CMD ["npm", "start"]