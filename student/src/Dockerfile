# Use an official Node.js LTS (Long Term Support) as the base image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]