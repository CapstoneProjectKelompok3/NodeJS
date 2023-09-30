FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN npm i nodemon -g
COPY . .
EXPOSE 3000
ENTRYPOINT ["sh", "./migrate.sh"]
