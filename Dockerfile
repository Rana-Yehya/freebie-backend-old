FROM node:22
WORKDIR /docker
#WORKDIR /usr/src/app
COPY package.json .
#COPY package*.json ./
RUN npm install
#RUN npm ci --only=production
COPY . .
RUN npx prisma generate
# RUN npx prisma migrate dev --name=test
# RUN  docker-compose run --name redis -p 6379:6379 -d redis
#ENV NODE_ENV=production
# RUN npx prisma migrate dev --name=test
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
EXPOSE 5003 

#3000
# CMD ["node", "index.js", "--watch"]
CMD ["npm", "run", "dev"]