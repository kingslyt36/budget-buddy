FROM node:20.4.0

# Set the working directory
WORKDIR /app

# Copy the package need to be install into working directory
COPY package*.json ./

# Install all the package
RUN npm install

# Then copy all the remaining file into working directory
COPY . .

# Run the app
CMD ["npm", "run", "start:dev"]