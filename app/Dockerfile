FROM node:8-alpine

RUN apk update && apk add bash

ENV INSTALL_PROJECT_PATH /app
RUN mkdir -p $INSTALL_PROJECT_PATH
WORKDIR $INSTALL_PROJECT_PATH

ADD . .

# RUN npm i -g yarn && chmod +x /usr/local/lib/node_modules/yarn/bin/yarn.js
# RUN yarn global add nodemon
# RUN yarn install

CMD ["yarn", "start"]