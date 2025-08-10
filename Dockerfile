FROM node:22
WORKDIR /docker
#WORKDIR /usr/src/app
COPY package.json .
COPY prisma ./prisma/
#COPY package*.json ./
RUN npm install

# Generate Prisma client & run migrations
# RUN npx prisma generate
RUN npx prisma migrate dev --name=init
#RUN npm ci --only=production
COPY . .
#ENV NODE_ENV=production
EXPOSE 5003 
#3000
# CMD ["node", "index.js", "--watch"]
CMD ["npm", "run", "dev"]
