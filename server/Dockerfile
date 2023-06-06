FROM node:18-alpine as build

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --production=true
COPY . .

EXPOSE 3005

# Start nginx server
CMD ["npm", "run", "start"]
