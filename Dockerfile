FROM node:7.7

ENV HOME=/home/node

COPY package.json $HOME/iiifp/
RUN chown -R node:node $HOME/*

USER node
WORKDIR $HOME/iiifp
RUN yarn install

USER root
COPY . $HOME/iiifp/
RUN chown -R node:node $HOME/*
user node

EXPOSE 3000
CMD ["yarn","run","start"]
