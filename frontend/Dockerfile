FROM node:16-alpine

RUN mkdir /frontend
WORKDIR /frontend

COPY package.json yarn.lock ./
RUN yarn install

COPY . /frontend

# CMD [ "yarn", "dev" ]