# Stage 1: Build the React app
FROM node:18-alpine as build

WORKDIR /app
# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --production=true

# Copy app source code
COPY . .

# Build the app
RUN yarn build

# Stage 2: Serve the built app
FROM nginx:1.19-alpine

# Copy the built app from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy the nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
