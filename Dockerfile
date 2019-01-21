FROM node:8.12.0

RUN apt-get update -y
RUN apt-get install apt-transport-https -y
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -y
RUN apt-get install yarn -y

WORKDIR /tmp
COPY config ./config
COPY public ./public
COPY scripts ./scripts
COPY src ./src
COPY package.json yarn.lock ./
RUN yarn install
RUN yarn build
RUN yarn global add serve

CMD serve -s build

EXPOSE 5000
