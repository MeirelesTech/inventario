FROM node:16-alpine

RUN mkdir /frontend
WORKDIR /frontend

COPY package.json yarn.lock ./

COPY . /frontend

CMD [ "yarn", "dev" ]