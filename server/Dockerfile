FROM node:18-alpine as build

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

EXPOSE 3005

# Start nginx server
CMD ["yarn", "start"]
