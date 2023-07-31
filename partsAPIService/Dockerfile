FROM node:18

# Create app directory
WORKDIR /usr/src/vehiclePartsInventory

# Install app dependencies
COPY package.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8090
CMD [ "npm", "start" ]