FROM node:17

ADD . /app
WORKDIR /app
RUN apt-get update && apt-get install net-tools
RUN npm install
EXPOSE 3000
CMD node main.js
