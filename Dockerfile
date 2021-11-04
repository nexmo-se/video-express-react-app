FROM node:14-alpine as build

ENV NODE_ENV=production

WORKDIR /build-dir

COPY package*json ./

RUN npm ci

COPY . .

RUN npm run build

########################################################################################################################

FROM node:14-alpine

ENV NODE_ENV=production

WORKDIR /home/node/app

COPY --from=build /build-dir ./

USER node

CMD ["npm", "run", "server-prod"]
