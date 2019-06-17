FROM node:10-alpine
WORKDIR /usr/src/app
COPY server.js server.js
COPY package.json package.json
COPY controllers controllers
COPY .env .env
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
