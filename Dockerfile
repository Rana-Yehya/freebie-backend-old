FROM node:22
WORKDIR /docker
#WORKDIR /usr/src/app
# ENV TZ=Africa/Cairo
# RUN apk add --no-cache tzdata

COPY package.json .
#COPY package*.json ./
RUN npm install
#RUN npm ci --only=production
COPY . .
#ENV NODE_ENV=production
EXPOSE 5003 

#3000
# CMD ["node", "index.js", "--watch"]
CMD ["npm", "run", "dev"]