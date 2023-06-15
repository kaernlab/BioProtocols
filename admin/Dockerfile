# Stage 1: Build the React app
FROM node:18-alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production=true
COPY . .
RUN yarn build

# Stage 2: Serve the built app
FROM nginx:alpine
EXPOSE 3001

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html