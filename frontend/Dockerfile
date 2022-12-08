FROM node:16-alpine

RUN mkdir /frontend
WORKDIR /frontend

COPY package.json yarn.lock ./
RUN yarn install

COPY . /frontend
# COPY next.config.js ./next.config.js
# COPY ./src ./src
# COPY ./services ./services
# COPY ./public ./public

CMD [ "yarn", "dev" ]