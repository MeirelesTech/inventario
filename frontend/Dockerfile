FROM inventario_frontend:v1

# RUN mkdir /frontend
WORKDIR /frontend

COPY package.json yarn.lock ./
# RUN yarn install

COPY . /frontend

# CMD [ "yarn", "dev" ]