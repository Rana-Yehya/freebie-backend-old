FROM node:22
WORKDIR /docker
# Copy core-gateway first
COPY core-gateway/ ./api-gateway/core-gateway/

# # Install core dependencies
# RUN cd core-gateway && npm install
COPY api-gateway/package*.json ./

# Copy current gateway files
COPY api-gateway/ ./


RUN npm install

# Copy api-gateway source code
# COPY . .

# Copy shared prisma folder from root
# COPY ../generated/ ../generated/
#RUN npm ci --only=production
# COPY . .
#ENV NODE_ENV=production
EXPOSE 5000
#3000
# CMD ["node", "index.js", "--watch"]
CMD ["npm", "run", "dev"]