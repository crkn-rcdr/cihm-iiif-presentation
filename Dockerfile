FROM node:7.7

ENV HOME=/home/node

COPY package.json $HOME/app/
RUN chown -R node:node $HOME/*

USER node
WORKDIR $HOME/app/
RUN yarn install

USER root
COPY . $HOME/app/
RUN chown -R node:node $HOME/*
USER node

EXPOSE 3000
