FROM node:alpine as builder
WORKDIR '/app'
COPY package.json .
# Option --legacy-peer-deps needed to resolve legacy react-github-login dep.
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder '/app/build' '/usr/share/nginx/html'