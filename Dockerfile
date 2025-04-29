FROM node:22
WORKDIR /docker
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5003
# CMD ["node", "index.js", "--watch"]
CMD ["npm", "run", "dev"]