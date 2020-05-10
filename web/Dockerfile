### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:current-alpine as builder

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm ci \
    && mkdir /ng-app \
    && mv ./node_modules ./ng-app \
    && apk del .gyp

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder

RUN npm run build

### STAGE 2: Setup ###

FROM nginx:stable-alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist/web /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/nginx.conf