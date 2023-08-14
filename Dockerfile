FROM node:20.4.0

# Set the working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .