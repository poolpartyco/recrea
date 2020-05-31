FROM node:10-alpine

# Create app directory
WORKDIR /src

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "npm", "start" ]