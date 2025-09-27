FROM node:22
WORKDIR /docker
# COPY package*.json ./
# RUN npm install

# COPY . .
COPY package*.json ./

# Copy current gateway files
COPY . .

RUN npm install

# RUN npx prisma migrate dev --name=test   
# COPY ../generated/ ../generated/

#RUN npm ci --only=production
# COPY . .
#ENV NODE_ENV=production
# EXPOSE 5001
# #3000
# # CMD ["node", "index.js", "--watch"]
# CMD ["npm", "run", "dev"]
#CMD ["node", "index.js"]