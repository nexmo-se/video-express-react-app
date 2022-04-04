FROM node:14-alpine as build

ENV NODE_ENV=production

WORKDIR /build-dir

COPY package*json ./

RUN npm ci

COPY . .

RUN npm run build

RUN echo "commit: $COMMIT_SHA" >> ./commit.sha

########################################################################################################################

FROM node:14-alpine

ENV NODE_ENV=production
ENV VIDEO_API_API_KEY=$VIDEO_API_API_KEY
ENV VIDEO_API_API_SECRET=$VIDEO_API_API_SECRET

WORKDIR /home/node/app

COPY --from=build /build-dir ./

USER node

CMD ["npm", "run", "server-prod"]
